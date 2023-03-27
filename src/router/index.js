import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue";
import Competition from "../views/Competition.vue";
import GymnasticView from "../views/GymnasticView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',

      component: LoginView
    },
    {
      path: '/competition/:id',
      name: 'competition',

      component: Competition
    },
    {
      path: '/competition/:competition/:gymnastic',
      name: 'gymnastic',
      component: GymnasticView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

export default router
