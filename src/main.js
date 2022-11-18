import { createApp } from 'vue';
import '@/assets/scss/main.scss';
import ElementPlus from 'element-plus';
import mitt from 'mitt';
import App from './App.vue';
import router from './router';
import store from './store';

const eventBus = mitt();
const app = createApp(App);

app.config.globalProperties.eventBus = eventBus;
app.use(ElementPlus).use(store).use(router).mount('#app');
