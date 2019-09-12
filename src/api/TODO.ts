import fetch from "isomorphic-fetch";
import BackItem from "../models/backItem";
import { AuthPayload, User } from "../interfaces/auth";
import { getAccessToken } from "../tools/tokenTools";

const API_URL = "http://localhost:4000";

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

function hashCode(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        const character = value.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

let items = [
    {
        key: 2345234523,
        value: "Test",
        done: false
    },
    {
        key: 52345234,
        value: "Test2",
        done: false
    }
];

const user = {
    id: "adfaasf",
    name: "asdgfadfa"
};

export default {
    getItems: (): Promise<BackItem[]> => {
        return new Promise((resolve): void => {
            setInterval(() => {
                resolve(items);
            }, 1000);
        });
    },
    getItem: (key: BackItem["key"]): Promise<BackItem> => {
        return new Promise((resolve): void => {
            setInterval(() => {
                resolve(items.find((item: BackItem): boolean => item.key === key));
            }, 1000);
        });
    },
    editItem: (item: BackItem): Promise<BackItem> => {
        return new Promise((resolve): void => {
            setInterval(() => {
                items = items.map(oldItem => {
                    if (oldItem.key !== item.key) {
                        return oldItem;
                    } else {
                        return item;
                    }
                });
                resolve(item);
            }, 1000);
        });
    },
    removeItem: (key: BackItem["key"]): Promise<BackItem["key"]> => {
        return new Promise((resolve): void => {
            setInterval(() => {
                items = items.filter(item => item.key !== key);
                resolve(key);
            }, 1000);
        });
    },
    addItem: (value: BackItem["value"]): Promise<BackItem> => {
        return new Promise((resolve, reject): void => {
            setInterval(() => {
                if (items.find(item => item.value === value)) {
                    reject(["Such TODO already exists"]);
                } else {
                    const item = {
                        value: value,
                        key: hashCode(value),
                        done: false
                    };
                    items.unshift(item);
                    resolve(item);
                }
            }, 1000);
        });
    },
    login: ({ name, password }: { name: User["name"]; password: string }): Promise<AuthPayload> => {
        return new Promise((resolve, reject): void => {
            user.name = name;
            setInterval(() => {
                resolve({
                    token: "adfadf",
                    user
                });
            }, 1000);
        });
    },
    signUp: ({ name, password }: { name: User["name"]; password: string }): Promise<AuthPayload> => {
        return TODOFetch(
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
        ) as Promise<AuthPayload>;
    },
    getUser: (): Promise<User> => {
        return new Promise((resolve, reject): void => {
            setInterval(() => {
                resolve(user);
            }, 1000);
        });
    }
};
