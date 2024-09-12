<template>
    <div class="border">
        <table class="w-full border" :class="[
            props.showHorizontalScrollbar ? 'overflow-x-auto' : 'overflow-x-hidden',
            props.showVerticalScrollbar ? 'overflow-y-auto' : 'overflow-y-hidden',
            props.style?.borderColor ? `border-[${props.style.borderColor}]` : '',
            props.style?.borderWidth ? `border-${props.style.borderWidth}` : '',
            props.style?.borderRadius ? `rounded-${borderRadius}` : '',
        ]">
            <thead>
                <tr class="w-full">
                    <th v-for="(header, key) in headers" v-bind:key="key" :id="String(key)" :rowspan="header.rowSpan"
                        :colspan="header.colSpan" @click="handleSort(header.value)" class="border-b cursor-pointer"
                        :class="[
                            header.position === 'left' ? 'text-left' : '',
                            header.position === 'center' ? 'text-center' : '',
                            header.position === 'right' ? 'text-right' : '',
                            header.style?.bold ? 'font-bold' : '',
                            header.style?.color ? `text-[${header.style?.color}]` : '',
                            header.style?.uppercase ? 'uppercase' : '',
                            header.style?.italic ? 'italic' : '',
                            header.style?.underline ? 'underline' : '',
                        ]" :style="`padding: ${header.style?.padding || 8}px`">
                        <div class="flex items-center justify-between">
                            <span>{{ header.text }}</span>
                            <Sort class="ml-2 flex-shrink-0" :class="{
                                'text-sky-500 rotate-180': sortState.column === header.value,
                                'text-gray-500': sortState.column !== header.value
                            }" />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody class="relative">
                <tr v-for="(item, index) in paginatedItems" :key="index" :class="[
                    props.striped?.show && props.striped?.position === 'show-first' ? (index % 2 !== 0 ? 'bg-gray-100' : '') : '',
                    props.striped?.show && props.striped?.position === 'skip-first' ? (index % 2 !== 0 ? 'bg-gray-100' : '') : '',
                ]">
                    <td v-for="header in headers" :key="header.value" :class="[
                        header.position === 'left' ? 'text-left' : '',
                        header.position === 'center' ? 'text-center' : '',
                        header.position === 'right' ? 'text-right' : '',
                        header.style?.bold ? 'font-bold' : '',
                        header.style?.color ? `text-[${header.style?.color}]` : '',
                        header.style?.uppercase ? 'uppercase' : '',
                        header.style?.italic ? 'italic' : '',
                        header.style?.underline ? 'underline' : '',
                        header.style?.cellStyle?.borderRightWidth ? `border-r-${header.style?.cellStyle.borderRightWidth || 1};` : '',
                        header.style?.cellStyle?.borderBottomWidth ? `border-b-${header.style?.cellStyle.borderBottomWidth || 1};` : '',
                        header.style?.cellStyle?.borderTopWidth ? `border-t-${header.style?.cellStyle.borderTopWidth || 1};` : '',
                        header.style?.cellStyle?.borderLeftWidth ? `border-l-${header.style?.cellStyle.borderLeftWidth || 1};` : '',
                        header.style?.cellStyle?.borderColor ? `border-color-[${header.style?.cellStyle.borderColor}]` : '',
                    ]" class="border-b p-2 hover:cursor-pointer" @click="emit('cell-click', {
                        item: item,
                        data: item[header.value],
                        index: index,
                        event: $event,
                    })">
                        <slot :name="header.value" :item="item"></slot>
                        {{ item[header.value] }}
                    </td>
                </tr>
                <div v-if="loading" class="absolute z-10"
                    :class="props.loaderStyle?.position === 'center' ? 'top-0 mx-auto flex justify-center items-center w-full h-full' : ''">
                    <component v-if="!isDefaultLoader" :class="[props.loaderStyle?.color ? `text-[${props.loaderStyle.color}]` : ''
                    ]" :style="`height: ${props?.loaderStyle.height}px; width: ${props?.loaderStyle.width}px;`"
                        :is="displayLoader" />
                    <slot v-else name="loader"></slot>
                </div>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="100%" class="px-6 py-3 border-t border-gray-200 bg-gray-50">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center">
                                <span class="text-sm text-gray-700 mr-2">Show</span>
                                <select v-model="itemsPerPage"
                                    :class="[props.style?.borderRadius ? `rounded-${borderRadius}` : '']"
                                    class="form-select border-gray-400 px-2 py-2 shadow-sm focus:ring-none focus:outline-none">
                                    <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                                <span class="text-sm text-gray-700 ml-2">entries</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class="px-3 py-1 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Previous
                                </button>
                                <div class="flex items-center space-x-1">
                                    <template v-for="page in visiblePages" :key="page">
                                        <button v-if="page !== '...'" @click="goToPage(Number(page))" :class="[
                                            'px-3 py-1 text-sm font-medium',
                                            currentPage === page
                                                ? `text-white`
                                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50',
                                            props.style?.borderRadius ? `rounded-${borderRadius}` : ''
                                        ]" :style="currentPage === page ? { backgroundColor: props.color } : {}">
                                            {{ page }}
                                        </button>
                                        <span v-else class="px-3 py-1 text-gray-700">{{ page }}</span>
                                    </template>
                                </div>
                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <ArrowNext />
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, PropType, watch } from 'vue'
import type { Header, Loader, LoaderStyle, Striped, TableItem, TableStyle } from '../types';
import Dots from './Loaders/Dots.vue';
import Bubble from './Loaders/Bubble.vue';
import AltLoop from './Loaders/AltLoop.vue';
import MdLoop from './Loaders/MdLoop.vue';
import TwotoneLoop from './Loaders/TwotoneLoop.vue';
import ArrowNext from './Icons/ArrowNext.vue';
import Sort from './Icons/Sort.vue';
import { onSearch, sortColumn, toggleSortDirection } from '../utils/helpers';

const props = defineProps({
    headers: {
        type: Array as PropType<Header[]>,
        required: true
    },
    items: {
        type: Array as PropType<TableItem[]>,
        required: true
    },
    color: {
        type: String,
        required: false,
    },
    loading: {
        type: Boolean,
        required: false
    },
    search: {
        required: false,
        type: String
    },
    searchValue: {
        type: String,
        required: false
    },
    loader: {
        type: String as PropType<Loader>,
        required: false
    },
    loaderStyle: {
        type: Object as PropType<LoaderStyle>,
        required: false,
        default: {
            height: 50,
            width: 50
        }
    },
    showHorizontalScrollbar: {
        type: Boolean,
        default: false
    },
    showVerticalScrollbar: {
        type: Boolean,
        default: false
    },
    style: {
        type: Object as PropType<TableStyle>
    },
    striped: {
        type: Object as PropType<Striped>,
        required: false
    },
    totalItems: {
        type: Number,
        required: false
    },
    itemsPerPage: {
        type: Number,
        required: false
    },
    currentPage: {
        type: Number,
        required: false,
    }
});

const emit = defineEmits(['update:page', 'update:itemsPerPage', 'cell-click']);

const itemsPerPage = ref(props.itemsPerPage || 10);
const totalItems = ref(props.totalItems || 0)
const currentPage = ref(props.currentPage || 1);
const itemsPerPageOptions: number[] = [5, 10, 25, 50, 100];
const sortState = ref({ column: '', direction: 'asc' as 'asc' | 'desc' });

const filteredItems = computed(() => {
    if (props.search && props.searchValue) {
        return onSearch(props.items, props.search, props.searchValue);
    }
    return props.items;
});

const paginatedItems = computed((): TableItem[] => {
    const sorted = sortColumn(filteredItems.value, sortState.value.column, sortState.value.direction);
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return sorted.slice(start, end);
});

const totalPages = computed((): number => Math.ceil(totalItems.value / itemsPerPage.value));
const visiblePages = computed((): (string | number)[] => {
    const delta: number = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l;
    range.push(1);
    for (let i = currentPage.value - delta; i <= currentPage.value + delta; i++) {
        if (i < totalPages.value && i > 1) {
            range.push(i);
        }
    }
    range.push(totalPages.value);
    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }
    return rangeWithDots;
});

const prevPage = (): void => {
    if (currentPage.value > 1) {
        currentPage.value--;
        emit('update:page', currentPage.value);
    }
};

const nextPage = (): void => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        emit('update:page', currentPage.value);
    }
};

const goToPage = (page: number): void => {
    currentPage.value = page;
    emit('update:page', currentPage.value);
};

const borderRadius = computed((): string => {
    type tailwindRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    const radiusInterfacer: Record<string, tailwindRadius> = {
        "0": "none",
        "1": "sm",
        "2": "md",
        "3": "lg",
        "4": "xl",
        "5": "2xl",
        "6": "3xl",
    };
    return radiusInterfacer[props.style?.borderRadius || "full"];
});

const displayLoader = computed((): any => {
    const loadersInterfacer: Record<Loader, any> = {
        "dots": Dots,
        "bubbles": Bubble,
        "alt-loop": AltLoop,
        "md-loop": MdLoop,
        "twotone-loop": TwotoneLoop
    }
    return loadersInterfacer[props?.loader || "md-loop"]
});

const isDefaultLoader = computed(() => {
    return !props.loader || props.loader === 'md-loop';
});

const handleSort = (column: string) => {
    if (sortState.value.column === column) {
        sortState.value.direction = toggleSortDirection(sortState.value.direction);
    } else {
        sortState.value = { column, direction: 'asc' };
    }
};

watch(itemsPerPage, (i: number) => {
    emit('update:itemsPerPage', i);
    currentPage.value = 1;
    emit('update:page', currentPage.value);
});
</script>

<style lang="css" scoped></style>