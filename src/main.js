import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './style.scss';
import * as bootstrap from 'bootstrap';
import './custom.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css';

createApp(App).use(router).mount('#app')
