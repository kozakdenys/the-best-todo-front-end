import Vue from "vue";
import Vuex from "vuex";
import items from "./modules/items";
import details from "./modules/details";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        items,
        details,
        auth
    }
});
