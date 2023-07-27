import {createWebHistory, createRouter} from "vue-router";
import routes from './routes';
import appConfig from "../../app.config";
import jwt from 'jwt-decode';
import {notifyError} from "@/components/composables/functions";
import sign from 'jwt-encode'
import {KEY_JWT} from "@/components/composables/variables";

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

    try {
        const token = localStorage.getItem('jwt');

        const decoded = jwt(token);
        const date = new Date().getTime() / 1000;

        if (decoded.exp < date) {
            localStorage.removeItem('jwt');
            notifyError('Sessão expirada!');
            next({name: 'login'});
        } else {
            const key = KEY_JWT;
            const iat = Math.floor(new Date().getTime() / 1000)
            const exp = Math.floor((new Date().getTime() / 1000) + 40 * 60);
            const payload = {
                exp: exp,
                iat: iat,
                token: decoded.token,
            };
            const newCode = sign(payload, key);
            localStorage.setItem('jwt', newCode);
            next();
        }
    } catch (e) {
        localStorage.removeItem('jwt');
        notifyError('Você precisa se autenticar!');
        next({
            name: 'login'
        });
    }
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
