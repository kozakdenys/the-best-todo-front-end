import api from "../../api/TODO";
import Item from "../../models/item";
import BackItem from "../../models/backItem";

const state = {
    all: [],
    processing: false,
    addItemErrors: []
};

const getters = {
    itemDetails: (state: Items): Function => (key: Item["key"]): Item | undefined => {
        return state.all.find((item: Item): boolean => item.key === key);
    }
};

const actions = {
    getItems({ commit }: { commit: Function }): void {
        api.getItems().then(backItems => {
            commit("setItems", {
                items: backItems.map(backItem => new Item(backItem))
            });
        });
    },
    editItem({ commit }: { commit: Function }, item: Item): void {
        api.editItem(new BackItem(item))
            .then(() => {
                commit("editItem", { item });
            })
            .catch(errors => {
                commit("editItemErrors", {
                    key: item.key,
                    errors: errors
                });
            });
    },
    removeItem({ commit }: { commit: Function }, key: Item["key"]): void {
        api.removeItem(key).then(() => {
            commit("removeItem", { key });
        });
    },
    addItem({ commit }: { commit: Function }, value: Item["value"]): void {
        api.addItem(value)
            .then(backItem => {
                commit("addItem", {
                    item: new Item(backItem)
                });
            })
            .catch(errors => {
                commit("addItemErrors", { errors });
            });
    }
};

const mutations = {
    setItems(state: Items, { items }: { items: Item[] }): void {
        state.all = items;
    },
    editItem(state: Items, { item }: { item: Item }): void {
        state.all = state.all.map(oldItem => {
            if (oldItem.key !== item.key) {
                return oldItem;
            } else {
                return {
                    ...item,
                    errors: []
                };
            }
        });
    },
    editItemErrors(state: Items, { key, errors }: { key: Item["key"]; errors: string[] }): void {
        state.all = state.all.map(oldItem => {
            if (oldItem.key !== key) {
                return oldItem;
            } else {
                return {
                    ...oldItem,
                    errors
                };
            }
        });
    },
    removeItem(state: Items, { key }: { key: Item["key"] }): void {
        state.all = state.all.filter(item => item.key !== key);
    },
    addItem(state: Items, { item }: { item: Item }): void {
        state.addItemErrors = [];
        state.all.unshift(item);
    },
    addItemErrors(state: Items, { errors }: { errors: string[] }): void {
        state.addItemErrors = errors;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
