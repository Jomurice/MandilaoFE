import { createRouter, createWebHistory } from "vue-router";

import login from "../components/login/login.vue";
import adminLogin from "../components/login/adminLogin.vue";
import register from "../components/account/register.vue";
import HomeUser from '../components/home/HomeUser.vue';
import HomeAdmin from '../components/home/HomeAdmin.vue';
import eventPage from "../components/eventPage/eventPage.vue";
import eventDetail from "../components/eventPage/eventDetail.vue";

const routes =[
    { path: '/', name: 'Home', component: HomeUser },
    { path: '/Admin', name: 'Admin', component: HomeAdmin },
    {path:"/login", component: login},
    {path:"/adminLogin", component: adminLogin},
    {path:"/register", component: register},
    {path: "/eventPage", component: eventPage},
    {path: "/eventDetail", component: eventDetail}
   

   
]

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;