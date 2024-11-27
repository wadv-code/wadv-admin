import './assets/index.css'
import './assets/base.css'

import { createApp } from 'vue'
import { initStores } from '@wadv/stores'

import App from './App.vue'
import { router } from './router'

async function bootstrap(namespace: string) {
  // // 初始化组件适配器
  // await initComponentAdapter();

  const app = createApp(App)

  // // 国际化 i18n 配置
  // await setupI18n(app)

  // 配置 pinia-store
  await initStores(app, { namespace })

  // // 安装权限指令
  // registerAccessDirective(app)

  // 配置路由及路由守卫
  app.use(router)

  // // 配置@tanstack/vue-query
  // app.use(VueQueryPlugin)

  // // 动态更新标题
  // watchEffect(() => {
  //   if (preferences.app.dynamicTitle) {
  //     const routeTitle = router.currentRoute.value.meta?.title
  //     const pageTitle = (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name
  //     useTitle(pageTitle)
  //   }
  // })

  app.mount('#app')
}

export { bootstrap }
