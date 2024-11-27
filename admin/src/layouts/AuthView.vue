<script lang="ts" setup>
import { computed } from 'vue'

// import { AuthPageLayout } from '@wadv/layouts'
import BasicView from './BasicView.vue'
import { preferences } from '@wadv/theme-config'

// import { $t } from '#/locales';

const appName = computed(() => preferences.app.name)
const logo = computed(() => preferences.logo.source)
</script>

<template>
  <BasicView :app-name="appName" :logo="logo" page-description="pageDesc" page-title="pageTitle">
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
  </BasicView>
</template>
