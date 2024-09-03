<template>
  <main class="container mx-auto px-4 py-8 relative">
    <TablePosts />

    <ClientOnly>
      <VLoader v-if="getLoadingState" />
    </ClientOnly>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePostsStore } from "~/stores/posts";
const postStore = usePostsStore();

const { getLoadingState } = storeToRefs(postStore);
</script>
