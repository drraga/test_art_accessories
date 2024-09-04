<template>
  <section
    class="flex items-center justify-center h-screen sticky inset-0 z-2 bg-white"
  >
    <div v-for="i in 5" :key="i" class="slider" :style="{ '--i': i - 1 }"></div>
  </section>
</template>
