<script setup lang="ts">
import { ref } from 'vue';
import { Header, TableItem } from './types';
import { Vue3DatatableX } from "vue3-datatable-x"
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
const search = ref('');
const getClickedCell = (e: any) => {
  console.log(e)
}
</script>

<template>
  <div>
    <div class="mt-10 mb-5">
      <input type="text" v-model="search" class="border border-black px-2 py-2 rounded"/>
    </div>
    <Vue3DatatableX @cell-click="getClickedCell" :search="search" search-value="occupation" :loader-style="{ position: 'center', height: 50, width: 50 }" :total-items="4" :items-per-page="1" :style="{ borderRadius: 2}" color="green" :headers="headers" :items="data" :striped="{ show: true, position: 'skip-first' }" />
  </div>
</template>
