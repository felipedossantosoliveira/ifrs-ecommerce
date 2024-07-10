import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/account/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/account/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/account/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue')
        },
        {
            path: '/shop',
            name: 'shop',
            component: () => import('../views/ProductsView.vue')
        },
        {
            path: '/product/:id',
            name: 'product',
            component: () => import('../views/ProductView.vue'),
            props: true
        }
    ]
})

export default router
