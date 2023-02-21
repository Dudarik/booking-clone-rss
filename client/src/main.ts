import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { languages } from './i18n';
import { defaultLocale } from './i18n';
import { createI18n, useI18n } from 'vue-i18n';
import VueKinesis from 'vue-kinesis';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
// import 'material-design-icons/iconfont/material-icons.css';

const localStorageLang = localStorage.getItem('lang');

const messages = Object.assign(languages);
const i18n = createI18n({
  legacy: false,
  locale: localStorageLang || defaultLocale,
  fallbackLocale: 'en',
  messages,
});

const app = createApp(App, {
  setup() {
    const { t } = useI18n();
    return { t };
  },
});

app.use(store);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(VueKinesis);
app.mount('#app');
