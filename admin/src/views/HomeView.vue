<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Label, Switch } from '@wadv/shadcn-ui'
import DropdownMenu from '../components/dropdown-menu/DropdownMenu.vue'
// import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'

const value = ref()
</script>

<template>
  <div class="flex justify-center">
    <div>
      <Calendar v-model="value" weekday-format="short" class="rounded-md border" />
      <DropdownMenu />
      <div class="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label for="airplane-mode">Airplane Mode</Label>
      </div>
    </div>
  </div>
</template>
