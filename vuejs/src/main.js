import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import AOS from 'aos';
import 'aos/dist/aos.css';
import store from "./state/store";

import BootstrapVue3 from 'bootstrap-vue-3';
import vClickOutside from "click-outside-vue3";
import VueApexCharts from "vue3-apexcharts";
import Maska from 'maska';

import VueFeather from 'vue-feather';

import '@/assets/scss/config/corporate/app.scss';
import '@vueform/slider/themes/default.css';
import '@/assets/scss/mermaid.min.css';

import Notifications from '@kyvg/vue3-notification'

import "@/assets/scss/app.css"

AOS.init({
    easing: 'ease-out-back',
    duration: 200
});

createApp(App)
    .use(store)
    .use(router)
    .use(VueApexCharts)
    .use(BootstrapVue3)
    .component(VueFeather.type, VueFeather)
    .use(Maska)
    .use(Notifications)
    .use(vClickOutside).mount('#app');