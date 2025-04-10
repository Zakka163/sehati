import { createRouter, createWebHistory } from 'vue-router'
import Register from '../page/Register.vue'
import Login from '../page/Login.vue'
import Dashboard from '../page/Dashboard.vue'
import Laporan from '../page/Laporan.vue'
import Pantau from '../page/Pantau.vue'
import Profile from '../page/Profile.vue'
const routes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    { path: '/', component: Dashboard },
    { path: '/pantau', component: Pantau },
    { path: '/laporan', component: Laporan },
    { path: '/profile', component: Profile },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
