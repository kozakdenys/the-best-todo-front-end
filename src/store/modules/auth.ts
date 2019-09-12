import api from "../../api/TODO";
import { AuthPayload, User } from "../../interfaces/auth";
import { getAccessToken, setAccessToken, deleteAccessToken } from "../../tools/tokenTools";
import router from "../../router";

const state = {
    user: null,
    authErrors: [],
    userErrors: []
};

const getters = {};

const actions = {
    login({ commit }: { commit: Function }, data: { name: User["name"]; password: string }): void {
        api.login(data)
            .then((payload: AuthPayload) => {
                setAccessToken(payload.token);
                commit("setUser", { user: payload.user });
                router.push("/");
            })
            .catch(errors => {
                commit("setAuthErrors", { errors });
            });
    },
    signUp({ commit }: { commit: Function }, data: { name: User["name"]; password: string }): void {
        api.signUp(data)
            .then((payload: AuthPayload) => {
                setAccessToken(payload.token);
                commit("setUser", { user: payload.user });
                router.push("/");
            })
            .catch(errors => {
                commit("setAuthErrors", { errors });
            });
    },
    logout({ commit }: { commit: Function }): void {
        deleteAccessToken();
        router.push("/login");
        commit("setUser", { user: null });
    },
    getUser({ commit }: { commit: Function }): void {
        api.getUser()
            .then((user: User) => {
                commit("setUser", { user });
            })
            .catch(errors => {
                commit("setUserErrors", { errors });
            });
    },
    authenticate({ commit, state }: { commit: Function; state: Auth }): Promise<void> {
        if (!getAccessToken()) {
            return Promise.reject();
        }

        if (state.user) {
            return Promise.resolve();
        } else {
            return api
                .getUser()
                .then((user: User) => {
                    commit("setUser", { user });
                })
                .catch(errors => {
                    commit("setUserErrors", { errors });
                    throw errors;
                });
        }
    }
};

const mutations = {
    setUser(state: Auth, { user }: { user: User | null }): void {
        state.user = user;
    },
    setAuthErrors(state: Auth, { errors }: { errors: Error[] }): void {
        state.authErrors = errors;
    },
    setUserErrors(state: Auth, { errors }: { errors: Error[] }): void {
        state.userErrors = errors;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
