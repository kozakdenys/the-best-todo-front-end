import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./components/main/main.vue";
import Details from "./components/details/details.vue";

Vue.use(VueRouter);

const routes = [{ path: "/", component: Main }, { path: "/details/:key", component: Details }];

export default new VueRouter({ routes, mode: "history" });
