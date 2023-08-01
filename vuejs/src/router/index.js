import {createWebHistory, createRouter} from "vue-router";
import routes from './routes';
import appConfig from "../../app.config";
import jwt from 'jwt-decode';
import {ACCESS_BY_LEVEL} from "@/components/composables/variables";

const router = createRouter({
    history: createWebHistory(),
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {top: 0, left: 0};
        }
    },
});

router.beforeEach(async (routeTo, routeFrom, next) => {

    const authRequired = routeTo.matched.some((route) => route.meta.authRequired);

    if (!authRequired) return next();

    if (localStorage.getItem('jwt') == null) next({name: 'login'});

    const authLevel = routeTo.matched.some((route) => route.meta.authLevel);
    if (authLevel) {
        const user = JSON.parse(localStorage.getItem('user'));
        const level = user.category;
        console.log(level)
        if (ACCESS_BY_LEVEL[level].indexOf(routeTo.name) < 0) next({name: 'dashboard'});
    }

    next();
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
    try {
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        if (args.length) {
                            next(...args);
                            reject(new Error('Redirected'));
                        } else {
                            resolve();
                        }
                    });
                } else {
                    resolve();
                }
            });
        }
    } catch (error) {
        return;
    }
    document.title = routeTo.meta.title + ' | ' + appConfig.title;
    next();
});

export default router;
