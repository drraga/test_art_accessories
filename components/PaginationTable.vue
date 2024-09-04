<template>
  <div class="mt-5 rounded shadow-md">
    <ul class="flex flex-auto justify-center bg-gray-200 rounded text-center">
      <PaginationArrow arrow-direction="left" :arrows-amount="2" />
      <PaginationArrow arrow-direction="left" :arrows-amount="1" />

      <li v-for="(_, index) in pagesToShow" :key="index" class="w-12">
        <a
          class="block p-1 pt-2 hover:text-white hover:bg-blue-300 transition-colors duration-100 ease-in border-b-4 border-transparent active:border-b-4 active:border-blue-500 cursor-pointer"
          >{{ index + 1 }}</a
        >
      </li>

      <PaginationArrow arrow-direction="right" :arrows-amount="1" />
      <PaginationArrow arrow-direction="right" :arrows-amount="2" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
const pagesToShow = 5;
</script>
