import store from "@/state/store";

export default [
    {
        path: "/",
        name: "dashboard",
        meta: {
            title: "Dashboard",
            authRequired: true,
        },
        component: () => import("../views/dashboard/ecommerce/index.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/account/login.vue"),
        meta: {
            title: "Login",
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters["auth/loggedIn"]) {
                    next({name: "dashboard"});
                } else {
                    next();
                }
            },
        },
    },
    {
        path: "/logout",
        name: "logout",
        component: () => import("../views/account/logout.vue"),
        meta: {
            title: "Logout",
        },
    },
    {
        path: "/cadastro/usuarios",
        name: "users",
        meta: {
            title: "Usuários",
            authRequired: true,
            authLevel: true
        },
        component: () => import("../views/register/users.vue"),
    },
];