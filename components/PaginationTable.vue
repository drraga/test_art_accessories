<template>
  <div class="mt-5 rounded shadow-md">
    <ul class="flex flex-auto justify-center bg-gray-200 rounded text-center">
      <PaginationArrow
        arrow-direction="left"
        :arrows-amount="2"
        :is-disabled="props.currentPage === 1"
        @click="$emit('pageClick', 1)"
      />
      <PaginationArrow
        arrow-direction="left"
        :arrows-amount="1"
        :is-disabled="props.currentPage === 1"
        @click="emit('pageStepChange', 'decrement')"
      />

      <li v-for="page in props.paginationPages" :key="page" class="w-12">
        <a
          class="active:border-b-4 active:border-blue-500 block p-1 pt-2 hover:text-white hover:bg-blue-300 transition-colors duration-100 ease-in cursor-pointer"
          :class="
            props.currentPage === page
              ? 'border-b-4 border-blue-600'
              : 'border-b-4 border-transparent'
          "
          @click="$emit('pageClick', page)"
          >{{ page }}</a
        >
      </li>

      <PaginationArrow
        arrow-direction="right"
        :arrows-amount="1"
        :is-disabled="props.currentPage === getTotalPages"
        @click="$emit('pageStepChange', 'increment')"
      />
      <PaginationArrow
        arrow-direction="right"
        :arrows-amount="2"
        :is-disabled="props.currentPage === getTotalPages"
        @click="$emit('pageClick', getTotalPages)"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { usePostsStore } from "~/stores/posts";

const postsStore = usePostsStore();
const { getTotalPages } = storeToRefs(postsStore);

const props = defineProps<{
  paginationPages: number[];
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: "pageClick" | "pageStepChange", page: number): void;
  (e: "pageStepChange", page: "increment" | "decrement"): void;
}>();
</script>
