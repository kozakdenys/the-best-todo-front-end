import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Main from "./components/main/main.vue";
import Details from "./components/details/details.vue";
import Login from "./components/login/login.vue";
import SignUp from "./components/signUp/signUp.vue";
import store from "./store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Main,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/details/:key",
        component: Details,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: "/signup",
        component: SignUp,
        meta: {
            guest: true
        }
    },
    { path: "*", redirect: "/" }
];

const router = new VueRouter({
    routes,
    mode: "history"
});

router.beforeEach((to: Route, from: Route, next: Function): void => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        store
            .dispatch("auth/authenticate")
            .then(() => {
                next();
            })
            .catch(() => {
                next("/login");
            });
    } else if (to.matched.some(record => record.meta.guest)) {
        store
            .dispatch("auth/authenticate")
            .then(() => {
                next("/");
            })
            .catch(() => {
                next();
            });
    }
    next();
});

export default router;
