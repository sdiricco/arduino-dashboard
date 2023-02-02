import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import DashboardPage from "../views/DashboardPage.vue"
import BoardPage from "../views/BoardPage.vue"
import PinConfigurationPage from "../views/PinConfigurationPage.vue"
import SettingsPage from "../views/SettingsPage.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    redirect: '/home/dashboard',
    children: [
      {
        path: "dashboard",
        component: DashboardPage
      },
      {
        path: "board",
        component: BoardPage
      },
      {
        path: "pin-configuration",
        component: PinConfigurationPage
      },
      {
        path: 'settings',
        component: SettingsPage
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
