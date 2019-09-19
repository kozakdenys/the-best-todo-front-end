import api from "../../api/TODO";
import Item from "../../models/item";
import BackItem from "../../models/backItem";

const state = {
    details: null
};

const getters = {};

const actions = {
    getDetails({ commit }: { commit: Function }, id: Item["id"]): void {
        api.getItem(id).then((backItem: BackItem) => {
            commit("setDetails", { item: new Item(backItem) });
        });
    },
    clearDetails({ commit }: { commit: Function }): void {
        commit("setDetails", { item: null });
    }
};

const mutations = {
    setDetails(state: Details, { item }: { item: Item | null }): void {
        state.details = item;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
