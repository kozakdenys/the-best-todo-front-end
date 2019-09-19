import api from "../../api/TODO";
import Item from "../../models/item";
import BackItem from "../../models/backItem";

const state = {
    all: [],
    processing: false,
    addItemErrors: []
};

const getters = {
    itemDetails: (state: Items): Function => (id: Item["id"]): Item | undefined => {
        return state.all.find((item: Item): boolean => item.id === id);
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
                    id: item.id,
                    errors: errors
                });
            });
    },
    removeItem({ commit }: { commit: Function }, id: Item["id"]): void {
        api.removeItem(id).then(() => {
            commit("removeItem", { id });
        });
    },
    addItem({ commit }: { commit: Function }, name: Item["name"]): void {
        api.addItem(name)
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
            if (oldItem.id !== item.id) {
                return oldItem;
            } else {
                return {
                    ...item,
                    errors: []
                };
            }
        });
    },
    editItemErrors(state: Items, { id, errors }: { id: Item["id"]; errors: Error[] }): void {
        state.all = state.all.map(oldItem => {
            if (oldItem.id !== id) {
                return oldItem;
            } else {
                return {
                    ...oldItem,
                    errors
                };
            }
        });
    },
    removeItem(state: Items, { id }: { id: Item["id"] }): void {
        state.all = state.all.filter(item => item.id !== id);
    },
    addItem(state: Items, { item }: { item: Item }): void {
        state.addItemErrors = [];
        state.all.unshift(item);
    },
    addItemErrors(state: Items, { errors }: { errors: Error[] }): void {
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
