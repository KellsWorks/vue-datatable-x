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

## Nuxt 3

```ts 
import Vue3EasyDataTable from 'vue3-datatable-x'
import 'vue3-datatable-x/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('EasyDataTable', Vue3EasyDataTable)
})
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
| headers | Array<Header> | Yes | - | Array of header objects defining the table columns |
| items | Array<TableItem> | Yes | - | Array of data objects to be displayed in the table |
| color | String | No | - | Primary color for the table (e.g., for selected page) |
| loading | Boolean | No | false | Whether the table is in a loading state |
| search | String | No | - | The field to search in the items array |
| searchValue | String | No | - | The value to search for |
| loader | String | No | 'md-loop' | Type of loader to display ('dots', 'bubbles', 'alt-loop', 'md-loop', 'twotone-loop') |
| loaderStyle | LoaderStyle (see types) | No | { height: 50, width: 50 } | Custom styles for the loader |
| showHorizontalScrollbar | Boolean | No | false | Whether to show a horizontal scrollbar |
| showVerticalScrollbar | Boolean | No | false | Whether to show a vertical scrollbar |
| style | TableStyle (see types) | No | - | Custom styles for the table |
| striped | Object | No | - | Configuration for striped rows |
| totalItems | Number | No | - | Total number of items (for pagination) |
| itemsPerPage | Number | No | 10 | Number of items to display per page |
| currentPage | Number | No | 1 | Current active page |

### Events

| **Event**              | **Description**                                                     |
|------------------------|---------------------------------------------------------------------|
| `update:page`          | Emitted when the current page changes.                              |
| `update:itemsPerPage`  | Emitted when the number of items per page changes.                  |
| `cell-click`           | Emitted when a cell is clicked, providing details about the clicked item. |

### Slots

| **Slot**               | **Description**                                                     |
|------------------------|---------------------------------------------------------------------|
| `#[header.value]`       | Slot for custom content in a specific column, identified by `header.value`. |
| `#loader`              | Slot for a custom loader component.                                 |

## Styling

The component uses Tailwind CSS classes for styling. You can customize the appearance by providing a `style` prop or overriding the default classes.

| **Type**       | **Description**                                                                                         | **Properties**                                                                                                                                                                   |
|----------------|---------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **HeaderStyle**  | Defines the style of table headers.                                                                    | `uppercase?: boolean` <br> `bold?: boolean` <br> `italic?: boolean` <br> `underline?: boolean` <br> `color?: string` <br> `padding?: number` <br> `cellStyle?: ItemStyle`         |
| **HeaderPosition** | Specifies the position of the header text.                                                           | Can be one of: `'left'`, `'right'`, `'center'`.                                                                                                                                  |
| **Header**        | Represents a table header with various options.                                                       | `text: string` <br> `value: string` <br> `sort?: boolean` <br> `sortBy?: string` <br> `style?: HeaderStyle` <br> `position?: HeaderPosition` <br> `rowSpan?: number` <br> `colSpan?: number` |
| **TableStyle**    | Defines the overall style of the table.                                                               | `backgroundColor?: string` <br> `borderColor?: string` <br> `borderStyle?: string` <br> `borderWidth?: number` <br> `borderRadius?: number`                                       |
| **ItemStyle**     | Describes the style of individual items (cells) in the table.                                         | `backgroundColor?: string` <br> `textColor?: string` <br> `fontSize?: number` <br> `fontWeight?: number` <br> `fontFamily?: string` <br> `textAlign?: 'left' \| 'center' \| 'right'` <br> `padding?: number` <br> `margin?: number` <br> `borderRightWidth?: number` <br> `borderBottomWidth?: number` <br> `borderLeftWidth?: number` <br> `borderTopWidth?: number` <br> `borderColor?: string` |
| **Value**         | Represents the value of a table item.                                                                 | Can be one of: `string`, `number`, `boolean`, `Date`.                                                                                                                            |
| **TableItem**     | Defines a table item (cell) and its properties.                                                       | `[key: string]: Value` <br> `isClickable?: boolean` <br> `onClick?: () => void` <br> `style?: ItemStyle`                                                                         |
| **Striped**       | Describes whether to show striped rows and their pattern.                                             | `show?: boolean` <br> `position?: "skip-first" \| "show-first"`                                                                                                                  |
| **Loader**        | Represents different loading animations.                                                              | Can be one of: `"dots"`, `"alt-loop"`, `"twotone-loop"`, `"md-loop"`, `"bubbles"`.                                                                                               |
| **LoaderStyle**   | Defines the style of the loader animation.                                                            | `color?: string` <br> `width?: number` <br> `height?: number` <br> `position?: "center" \| "left" \| "right" \| "bottom"`                                                        |

This table summarizes the purpose and properties of each type or interface, providing an overview of their usage and fields.

## Contributing
Here's how you can help:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with a clear commit message
4. Push your changes to your fork
5. Submit a pull request to the main repository

Please ensure that your code follows the existing style and includes appropriate tests.
## Issues and Bug Reports
This package is still in progress. If you encounter any issues or want to request a new feature, please open an issue on our GitHub repository. When reporting bugs, please include:

1. A clear description of the issue
2. Steps to reproduce the problem
3. Expected behavior
4. Actual behavior
5. Any relevant code snippets or error messages

## License

[MIT License](LICENSE)