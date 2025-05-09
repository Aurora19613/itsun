import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/login', component: () => import('@/views/login/LoginPage.vue')},
    {
      path: '/', 
      component: () => import('@/views/Layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children:[
        {path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue')},
        {path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue')},
        {path: '/user/profile', component: () => import('@/views/user/UserProfile.vue')},
        {path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue')},
        {path: '/user/password', component: () => import('@/views/user/UserPassword.vue')} 
      ]
    }
  ],
})
router.beforeEach((to) => {
  const useUser = useUserStore()
  if(!useUser.token && to.path !== '/login') {
    return '/login'
  }
})
export default router
