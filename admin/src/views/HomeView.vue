<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { Calendar, Label, Switch, Button } from '@wadv/shadcn-ui'
import DropdownMenu from '../components/dropdown-menu/DropdownMenu.vue'
import { useDark, useToggle } from '@vueuse/core'
// import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'

const value = ref()

const isDark = useDark()

const toggleDark = useToggle(isDark)

function toggleTheme(event: MouseEvent) {
  const isAppearanceTransition =
    !!document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition || !event) {
    toggleDark()
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  const transition = document.startViewTransition(async () => {
    toggleDark()
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 450,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <div class="flex justify-center relative min-h-screen">
    <div class="pt-2 text-center">
      <Button @click="toggleTheme">切换{{ isDark ? '浅色' : '深色' }}</Button>
      <Calendar v-model="value" weekday-format="short" class="rounded-md border mt-2" />
      <DropdownMenu />
      <Button @click="toggleTheme" class="">动画跟随鼠标</Button>
      <div class="flex items-center space-x-2 mt-5">
        <Switch id="airplane-mode" />
        <Label for="airplane-mode">Airplane Mode</Label>
      </div>
    </div>
    <Button @click="toggleTheme" class="absolute left-2 top-2">动画跟随鼠标</Button>
    <Button @click="toggleTheme" class="absolute right-2 top-2">动画跟随鼠标</Button>
    <Button @click="toggleTheme" class="absolute left-2 bottom-2">动画跟随鼠标</Button>
    <Button @click="toggleTheme" class="absolute right-2 bottom-2">动画跟随鼠标</Button>
  </div>
</template>
