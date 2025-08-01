import { createRouter, createWebHistory } from "vue-router";

import login from "../components/login/login.vue";
import adminLogin from "../components/login/adminLogin.vue";
import register from "../components/account/register.vue";
import HomeUser from "../components/home/HomeUser.vue";
import HomeAdmin from "../components/home/HomeAdmin.vue";
import eventPage from "../components/eventPage/eventPage.vue";
import eventDetail from "../components/eventPage/eventDetail.vue";
import profileUser from "../components/account/profile-user.vue";

import menu from "../components/menu/menu.vue";
import cart from "../components/cart/cart.vue"
import productSearch from "../components/menu/product-search.vue";
import ProductManager from "../components/adminPanel/ProductManager.vue";
import CategoryManager from "../components/adminPanel/СategoriesManager.vue"
import UsersManager from "../components/adminPanel/UsersManager.vue";
import AdminTable from '../components/Table/AdminTable.vue'

const routes = [
  { path: "/", name: "Home", component: HomeUser },
  { path: "/Admin", name: "Admin", component: HomeAdmin },
  { path: "/login", component: login },
  { path: "/adminLogin", component: adminLogin },
  { path: "/register", component: register },
  { path: "/eventPage", component: eventPage },
  { path: "/eventDetail", component: eventDetail },
  { path: "/profileuser", component: profileUser },
  { path: "/menu", component: menu },
  { path: "/cart", component: cart},
  { path: '/search',name: 'product-search',component: productSearch},
  { path: '/admin/table', name: 'AdminTable', component: AdminTable },




  // {path: "/admin/product", name: "productManager", component: ProductManager }
  {
  path: '/admin',
  component: HomeAdmin, 
  children: [
    {
      path: 'product',
      component: ProductManager
    },
    {
      path:'category',
      component: CategoryManager
    },
    {
      path:'users',
      component: UsersManager
    },
  ]
}

];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

