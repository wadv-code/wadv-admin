<script lang="ts" setup>
import LayoutContent from './LayoutContent.vue'
</script>
<template>
  <div class="relative flex min-h-full w-full">
    <div
      ref="contentRef"
      class="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in"
    >
      <LayoutContent>
        <slot name="content"></slot>
      </LayoutContent>
    </div>
    <div
      class="bg-overlay fixed left-0 top-0 h-full w-full transition-[background-color] duration-200"
    ></div>
  </div>
</template>
