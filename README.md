# Vue 3 Datatable X

A highly customizable and feature-rich table component for Vue 3 applications.

## Features

- Sortable columns
- Pagination
- Custom styling options
- Striped rows
- Loading state with customizable loaders
- Search functionality
- Responsive design with optional scrollbars
- Cell click events
- Customizable item display count

## Installation

```bash
npm install vue3-datatable-x
```

## Usage

```vue
<template>
  <Vue3DataTableX
    :headers="headers"
    :items="items"
    :color="'#4CAF50'"
    :loading="isLoading"
    :search="searchField"
    :searchValue="searchQuery"
    :loader="'dots'"
    :showHorizontalScrollbar="true"
    :showVerticalScrollbar="false"
    :style="tableStyle"
    :striped="{ show: true, position: 'show-first' }"
    :totalItems="totalItemCount"
    :itemsPerPage="10"
    :currentPage="1"
    @update:page="handlePageChange"
    @update:itemsPerPage="handleItemsPerPageChange"
    @cell-click="handleCellClick"
  >
    <!-- Optional: Custom cell content -->
    <template #cell-name="{ item }">
      <strong>{{ item.name }}</strong>
    </template>

    <!-- Optional: Custom loader -->
    <template #loader>
      <MyCustomLoader />
    </template>
  </Vue3DataTableX>
</template>

<script setup>
import { ref } from 'vue';
import { Vue3DatatableX } from 'vue3-datatable-x';

const headers = [
  { text: 'Name', value: 'name', position: 'left', style: { bold: true } },
  { text: 'Age', value: 'age', position: 'center' },
  { text: 'Email', value: 'email', position: 'right' },
];

const items = ref([
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  // ... more items
]);

const isLoading = ref(false);
const searchField = 'name';
const searchQuery = ref('');

const tableStyle = {
  borderColor: '#ddd',
  borderWidth: 1,
  borderRadius: 2,
};

const handlePageChange = (page) => {
  console.log('Page changed:', page);
};

const handleItemsPerPageChange = (count) => {
  console.log('Items per page changed:', count);
};

const handleCellClick = ({ item, data, index, event }) => {
  console.log('Cell clicked:', { item, data, index, event });
};
</script>
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| headers | Array | Yes | - | Array of header objects defining the table columns |
| items | Array | Yes | - | Array of data objects to be displayed in the table |
| color | String | No | - | Primary color for the table (e.g., for selected page) |
| loading | Boolean | No | false | Whether the table is in a loading state |
| search | String | No | - | The field to search in the items array |
| searchValue | String | No | - | The value to search for |
| loader | String | No | 'md-loop' | Type of loader to display ('dots', 'bubbles', 'alt-loop', 'md-loop', 'twotone-loop') |
| loaderStyle | Object | No | { height: 50, width: 50 } | Custom styles for the loader |
| showHorizontalScrollbar | Boolean | No | false | Whether to show a horizontal scrollbar |
| showVerticalScrollbar | Boolean | No | false | Whether to show a vertical scrollbar |
| style | Object | No | - | Custom styles for the table |
| striped | Object | No | - | Configuration for striped rows |
| totalItems | Number | No | - | Total number of items (for pagination) |
| itemsPerPage | Number | No | 10 | Number of items to display per page |
| currentPage | Number | No | 1 | Current active page |

## Events

- `update:page`: Emitted when the current page changes
- `update:itemsPerPage`: Emitted when the number of items per page changes
- `cell-click`: Emitted when a cell is clicked, providing details about the clicked item

## Slots

- `#[header.value]`: Custom content for a specific column
- `#loader`: Custom loader component

## Styling

The component uses Tailwind CSS classes for styling. You can customize the appearance by providing a `style` prop or overriding the default classes.

## License

[MIT License](LICENSE)