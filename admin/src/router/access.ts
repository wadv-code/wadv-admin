import type { ComponentRecordType, GenerateMenuAndRoutesOptions } from '@wadv/interfaces'

import { generateAccessible } from '@wadv/access'
import { preferences } from '@wadv/theme-config'

// import { message } from 'ant-design-vue'

// import { getAllMenusApi } from '#/api'
import { BasicLayout, IFrameView } from '@/layouts'
// import { $t } from '#/locales'

const forbiddenComponent = () => import('@/views/fallback/forbidden.vue')

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue')
  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView,
  }
  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      // message.loading({
      //   content: `loadingMenu...`,
      //   duration: 1.5,
      // })
      // return await getAllMenusApi()
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              component: 'BasicLayout',
              meta: {
                order: -1,
                title: 'page.dashboard.title',
              },
              name: 'Dashboard',
              path: '/',
              redirect: '/analytics',
              children: [
                {
                  name: 'Analytics',
                  path: '/analytics',
                  component: '/dashboard/analytics/index',
                  meta: {
                    affixTab: true,
                    title: 'page.dashboard.analytics',
                  },
                },
              ],
            },
          ])
        }, 1000)
      })
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  })
}

export { generateAccess }
