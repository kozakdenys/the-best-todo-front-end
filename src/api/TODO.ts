import fetch from "isomorphic-fetch";
import BackItem from "../models/backItem";
import FrontItem from "../models/frontItem";
import { AuthPayload, User } from "../interfaces/auth";
import { Feed } from "../interfaces/feed";
import { getAccessToken } from "../tools/tokenTools";

//TODO use env variable
const API_URL = `http://${location.hostname}:4000`;

export function graphqlFetch(query: string, variables?: object): Promise<Response> {
    const init = {
        method: "post",
        mode: "cors" as RequestMode,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getAccessToken()
        },
        body: JSON.stringify({
            query,
            variables
        })
    };

    return fetch(`${API_URL}`, init);
}

export function TODOFetch(query: string, variables?: object): Promise<object> {
    return graphqlFetch(query, variables)
        .catch(error => {
            return Promise.reject([error]);
        })
        .then(response => {
            if (response.status >= 200 && response.status < 400) {
                return Promise.resolve(response);
            }

            return Promise.reject([new Error(`Network error with status ${response.status}`)]);
        })
        .then(data => data.json())
        .then(data => {
            if (data.errors) {
                return Promise.reject(data.errors.map((error: { message: string }) => new Error(error.message)));
            }

            return Promise.resolve(data.data);
        });
}

export default {
    getItems: (): Promise<BackItem[]> => {
        // TODO use fragments
        return (TODOFetch(
            `
            query GetFeed {
                feed {
                    items {
                        id
                        createdAt
                        updatedAt
                        name
                        done
                    }
                }
            }`
        ) as Promise<{ feed: Feed }>).then(({ feed }) => feed.items);
    },
    getItem: (id: FrontItem["id"]): Promise<BackItem> => {
        // TODO use fragments
        return (TODOFetch(
            `
            query GetItem($id: ID!) {
                item(id: $id) {
                    id
                    createdAt
                    updatedAt
                    name
                    done
                }
            }`,
            {
                id
            }
        ) as Promise<{ item: BackItem }>).then(({ item }) => item);
    },
    // TODO use fragments
    editItem: (item: FrontItem): Promise<BackItem> => {
        return (TODOFetch(
            `
            mutation UpdateItem($id: ID!, $name: String, $description: String, $done: Boolean) {
                updateItem(id: $id, name: $name, description: $description, done: $done) {
                    id
                    createdAt
                    updatedAt
                    name
                    done
                }
            }`,
            {
                ...item
            }
        ) as Promise<{ updateItem: BackItem }>).then(({ updateItem }) => updateItem);
    },
    // TODO use fragments
    removeItem: (id: FrontItem["id"]): Promise<BackItem["id"]> => {
        return (TODOFetch(
            `
            mutation DeleteItem($id: ID!) {
                deleteItem(id: $id) {
                    id
                }
            }`,
            {
                id
            }
        ) as Promise<{ deleteItem: { id: BackItem["id"] } }>).then(({ deleteItem }) => deleteItem.id);
    },
    // TODO use fragments
    addItem: (name: BackItem["name"]): Promise<BackItem> => {
        return (TODOFetch(
            `
            mutation CreateItem($name: String!) {
                createItem(name: $name) {
                    id
                    createdAt
                    updatedAt
                    name
                    done
                }
            }`,
            {
                name
            }
        ) as Promise<{ createItem: BackItem }>).then(({ createItem }) => createItem);
    },
    //TODO use interface
    login: ({ name, password }: { name: User["name"]; password: string }): Promise<AuthPayload> => {
        return (TODOFetch(
            `
            mutation Login($name: String!, $password: String!) {
                login(name: $name, password: $password) {
                    token
                    user {
                        id
                        name
                    }
                }
            }`,
            {
                name,
                password
            }
        ) as Promise<{ login: AuthPayload }>).then(({ login }) => login);
    },
    //TODO use interface
    signUp: ({ name, password }: { name: User["name"]; password: string }): Promise<AuthPayload> => {
        return (TODOFetch(
            `
            mutation CreateUser($name: String!, $password: String!) {
                signup(name: $name, password: $password) {
                    token
                    user {
                        id
                        name
                    }
                }
            }`,
            {
                name,
                password
            }
        ) as Promise<{ signup: AuthPayload }>).then(({ signup }) => signup);
    },
    getUser: (): Promise<User> => {
        return (TODOFetch(
            `
            query GetUser {
                user {
                    id
                    name
                }
            }`
        ) as Promise<{ user: User }>).then(({ user }) => user);
    }
};
