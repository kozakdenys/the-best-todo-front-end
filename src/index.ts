import Vue, { VNode } from "vue";
import App from "./app.vue";
import store from "./store";

new Vue({
    el: "#app",
    store,
    render: (h): VNode => h(App)
});
