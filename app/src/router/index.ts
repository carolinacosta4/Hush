import { createRouter, createWebHistory } from 'vue-router';
import Error from '@/views/auth/Error.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import MainRoutes from './MainRoutes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: Error
        },
        MainRoutes,
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
});

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !localStorage.getItem('authToken')) {
        return {
            path: '/login',
            query: { redirect: to.fullPath }
        };
    }
});

export default router;
