import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ChatPage from '../views/ChatPage.vue'
import ErrorPage from '../views/ErrorPage.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home dir',
            component: HomePage
        },
        {
            path: '/room/:id',
            name: 'room',
            component: ChatPage
        },
        {
            path: '/error',
            name: 'error',
            component: ErrorPage,
            props: route => ({ errorMessage: route.query.errorMessage })
        }
    ]
})

export default router