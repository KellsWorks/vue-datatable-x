<script setup lang="ts">
import Datatable from './components/Datatable.vue';
import { Header, TableItem } from './types';
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
  {
    text: "occupation",
    value: "occupation"
  },
  {
    text: "city",
    value: "city"
  },
  {
    text: "country",
    value: "country"
  },
];

const data: TableItem[] = [
  {
    id: 1,
    name: "John Doe",
    occupation: "Engineer",
    city: "New York",
    country: "USA"
  },
  {
    id: 2,
    name: "Jane Smith",
    occupation: "Doctor",
    city: "Los Angeles",
    country: "USA"
  },
  {
    id: 3,
    name: "Alice Johnson",
    occupation: "Teacher",
    city: "London",
    country: "UK"
  },
  {
    id: 4,
    name: "Bob Brown",
    occupation: "Artist",
    city: "Paris",
    country: "France"
  }
];
</script>

<template>
  <div>
    <Datatable :total-items="4" :items-per-page="1" :style="{ borderRadius: 2}" color="green" :headers="headers" :items="data" :striped="{ show: true, position: 'skip-first' }" />
  </div>
</template>
