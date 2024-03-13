import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/play/:version/:set', // Définir le paramètre ':version' dans le chemin de la route
      name: 'play',
      component: PlayView,
      props: true // Indiquer que les paramètres de la route doivent être traités comme des props
    }
  ]
})

export default router
