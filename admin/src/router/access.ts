// import type { ComponentRecordType, GenerateMenuAndRoutesOptions } from '@wadv/interfaces'

// import { generateAccessible } from '@wadv/access'
// import { preferences } from '@wadv/preferences'

// import { message } from 'ant-design-vue'

// import { getAllMenusApi } from '#/api'
// import { BasicLayout, IFrameView } from '#/layouts'
// import { $t } from '#/locales'

// const forbiddenComponent = () => import('#/views/_core/fallback/forbidden.vue')

// async function generateAccess(options: GenerateMenuAndRoutesOptions) {
//   const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue')
//   const layoutMap: ComponentRecordType = {
//     BasicLayout,
//     IFrameView,
//   }
//   return await generateAccessible(preferences.app.accessMode, {
//     ...options,
//     fetchMenuListAsync: async () => {
//       message.loading({
//         content: `${$t('common.loadingMenu')}...`,
//         duration: 1.5,
//       })
//       return await getAllMenusApi()
//     },
//     // 可以指定没有权限跳转403页面
//     forbiddenComponent,
//     // 如果 route.meta.menuVisibleWithForbidden = true
//     layoutMap,
//     pageMap,
//   })
// }

import type { GenerateMenuAndRoutesOptions } from '@wadv/interfaces'

async function generateAccess(params: GenerateMenuAndRoutesOptions) {
  console.log(params)
  return { accessibleMenus: [], accessibleRoutes: [] }
}

export { generateAccess }
