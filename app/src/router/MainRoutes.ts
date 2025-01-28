const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'Tips',
            path: '/tips',
            component: () => import('@/views/pages/Tips.vue')
        },
        {
            name: 'Account',
            path: '/account',
            component: () => import('@/views/pages/Account.vue')
        },
        {
            name: 'Add Log',
            path: '/createLog',
            component: () => import('@/views/pages/CreateLog.vue')
        }
    ]
};

export default MainRoutes;
