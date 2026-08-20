import { createRouter, createWebHistory } from "vue-router";


import LoginView from "../views/LoginView.vue";

import AdminOrdersView from "../views/AdminOrdersView.vue";

import OrderDetailView from "../views/OrderDetailView.vue";



const routes = [

    {
        path: "/",
        redirect: "/login"
    },


    {
        path: "/login",
        component: LoginView
    },


    {
        path: "/admin/orders",
        component: AdminOrdersView
    },


    {
        path: "/admin/orders/:id",
        component: OrderDetailView
    }

];



const router =
    createRouter({

        history:
            createWebHistory(),

        routes

    });



export default router;
