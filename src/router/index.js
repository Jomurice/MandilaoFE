import { createRouter, createWebHistory } from "vue-router";

import login from "../components/login/login.vue";
import adminLogin from "../components/login/adminLogin.vue";
import register from "../components/account/register.vue";
import HomeUser from '../components/home/HomeUser.vue';
import HomeAdmin from '../components/home/HomeAdmin.vue';

const routes =[
    {path:"/login", component: login},
    {path:"/adminLogin", component: adminLogin},
    {path:"/register", component: register},
    { path: '/', name: 'Home', component: HomeUser },
    { path: '/Admin', name: 'Admin', component: HomeAdmin }, 
   
]

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;