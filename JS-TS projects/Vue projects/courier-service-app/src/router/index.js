import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import NotFound from '../views/NotFound.vue'
import Detail from '../views/Detail.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      title:'About'
    }
  },
  {
    path: '/order/add',
    name: 'Add',
    component: Add,
    meta:{
      title:'Create Order'
    }
  },
  {
    path: '/order/:id',
    name: 'Detail',
    component: Detail,
    props:true,
    meta:{
      title:'Order Details'
    }
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/order/create',
    redirect: {name: 'Add'}
  },
  {
    path: '/:catchAll(.*)', 
    name: 'NotFound', 
    component: NotFound,
    meta:{
      title:'Not Found'
    }
    
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  next()
})
export default router
