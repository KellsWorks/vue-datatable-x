<script setup lang="ts">
import Datatable from './components/Datatable.vue';
import { Header } from './types';
const headers: Header[] = [
  {
    text: "ID",
    value: "id"
  },
  {
    text: "name",
    value: "name",
    style: {
      uppercase: true
    }
  },
]
</script>

<template>
  <div>
    <Datatable :headers="headers"/>
  </div>
</template>
