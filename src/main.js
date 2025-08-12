import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index.js';
import axios from 'axios';


axios.defaults.withCredentials = true;


createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
