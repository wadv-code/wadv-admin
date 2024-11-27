import type { RouteRecordRaw } from 'vue-router'

import { BasicLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '标题',
    },
    name: 'Dashboard',
    path: '/',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('@/views/dashboard/AnalyticsView.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '分析',
        },
      },
    ],
  },
]

export default routes
