<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutView from '@/components/Layout/LayoutView.vue'
</script>
<template>
  <LayoutView>
    <template #content>
      <RouterView></RouterView>
    </template>
  </LayoutView>
</template>
