import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/room/new',
      name: 'room-new',
      component: () => import('../views/CreateRoomView.vue')
    },
    {
      path: '/room/:id',
      name: 'room',
      component: () => import('../views/RoomView.vue')
    }
  ]
})

export default router
