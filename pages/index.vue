<template>
  <main class="container mx-auto px-4 py-8 relative">
    <TablePosts />

    <div class="absolute top-16 right-0">
      <ButtonPagination textButton="More posts" @click="incrementPage" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { usePostsStore } from "~/stores/posts";
const postStore = usePostsStore();

const { incrementPage } = postStore;
</script>
