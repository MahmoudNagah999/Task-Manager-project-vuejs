import {createRouter, createWebHistory} from 'vue-router'

import Home from '../view/home.vue'
import About from '../view/about.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(process.env.Base_URL),
    routes
})

export default router