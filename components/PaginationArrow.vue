<template>
  <li class="w-12">
    <a
      :class="[
        props.isDisabled ? 'cursor-not-allowed' : '',
        !props.isDisabled ? 'hover:bg-blue-300 hover:text-white' : '',
      ]"
      class="block p-1 pt-2 transition-colors duration-100 ease-in border-b-4 border-transparent cursor-pointer"
    >
      {{ props.arrowsAmount === 1 ? displayArrow : displayArrow.repeat(2) }}
    </a>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  arrowDirection: "left" | "right";
  arrowsAmount: number;
  isDisabled: boolean;
}>();

const displayArrow = computed(() =>
  props.arrowDirection === "left" ? "<" : ">",
);
</script>
