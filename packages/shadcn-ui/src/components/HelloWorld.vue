<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar';
// import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { ref } from 'vue';

const value = ref();
</script>

<template>
  <Calendar v-model="value" :weekday-format="'short'" class="rounded-md border" />
</template>
