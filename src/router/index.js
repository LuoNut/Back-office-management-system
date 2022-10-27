import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import Page1 from '../views/Page1.vue'
import Page2 from '../views/Page2.vue'


Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component:Main,
        redirect: '/home',
        children:[
            {
                path:'home',
                name:'home',
                component: Home
            },
            {
                path:'user',
                name:'user',
                component: User
            },
            {
                path:'mall',
                name:'mall',
                component: Mall
            },
            {
                path:'page1',
                name:'page1',
                component: Page1
            },
            {
                path:'page2',
                name:'page2',
                component: Page2
            }
        ]

    }

]

const router = new VueRouter ({
    routes
})

export default router