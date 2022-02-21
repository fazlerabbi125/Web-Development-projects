import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import Edit from '../views/Edit.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/task/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/task/:id/edit',
    name: 'Edit',
    component: Edit,
    props: true
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/task/create',
    redirect: {name: 'Add'}
  },
  {
    path: '/:catchAll(.*)', 
    name: 'NotFound', 
    component: NotFound
    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
