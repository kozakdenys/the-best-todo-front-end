import Vue, { VNode } from "vue";
import App from "./app.vue";

new Vue({
    el: "#app",
    render: (h): VNode => h(App)
});
