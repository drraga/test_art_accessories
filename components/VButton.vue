<template>
  <button
    class="button bg-blue-500 hover:bg-blue-700 transition-[colors, transform] duration-100 ease-in active:scale-90 text-white font-bold py-2 px-4 rounded flex gap-2 justify-center"
  >
    {{ props.buttonText }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  buttonText: string;
}>();
</script>
