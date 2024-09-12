<template>
    <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsum saepe nihil? Voluptatem animi doloribus minus assumenda soluta, voluptas maxime, veritatis eius cupiditate enim neque iure aperiam dolor beatae. Enim.
        <table class="w-full border"
        :class="[
            props.showHorizontalScrollbar ? 'overflow-x-auto' : 'overflow-x-hidden', 
            props.showVerticalScrollbar ? 'overflow-y-auto' : 'overflow-y-hidden',
            props.style?.borderColor ? `border-[${props.style.borderColor}]` : '',
            props.style?.borderWidth ? `border-${props.style.borderWidth}` : '',
            props.style?.borderRadius ? `rounded-${borderRadius}` : '',
        ]"
        >
            <thead>
                <tr class="w-full">
                    <th 
                        v-for="header, key in headers" v-bind:key="key"
                        :id="String(key)"
                        :rowspan="header.rowSpan"
                        :colspan="header.colSpan"
                        :class="[
                            header.position === 'left' ? 'text-left' : '',
                            header.position === 'center' ? 'text-center' : '',
                            header.position === 'right' ? 'text-right' : '',
                            header.style?.bold ? 'font-bold' : '',
                            header.style?.color ? `text-[${header.style?.color}]` : '',
                            header.style?.uppercase ? 'uppercase' : '',
                            header.style?.italic ? 'italic' : '',   
                            header.style?.underline ? 'underline' : '',
                        ]"
                        class="border-b"
                    >
                        {{ header.text }}
                    </th>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, defineExpose, computed, PropType } from 'vue'
import type { Header, TableStyle } from '../types';

const props = defineProps({
    headers: {
        type: Array as PropType<Header[]>,
        required: true
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
    }
});

const borderRadius = computed((): string => {
    type tailwindRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    const radiusInterfacer: Record<string, tailwindRadius> = {
        "0" : "none",
        "1" : "sm",
        "2" : "md",
        "3" : "lg",
        "4" : "xl",
        "5" : "2xl",
        "6" : "3xl",
    };
    return radiusInterfacer[props.style?.borderRadius || "full"];
})
</script>

<style lang="css" scoped>
</style>