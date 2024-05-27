import { createApp } from 'vue';
import './style.scss';

import App from './App.vue';

import router from './router';
import { vuetify } from '@/plugins/veautify.ts';

createApp(App).use(router).use(vuetify).mount('#app');
