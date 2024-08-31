<template>
  <template v-if="getPosts && !getLoadingState">
    <table
      class="table-auto w-full max-w-screen-xl mt-10 text-left border-collapse border border-gray-200"
    >
      <caption class="mb-4 text-2xl font-bold text-gray-800">
        Posts form JSONplaceholder
      </caption>
      <thead>
        <tr class="bg-gray-100">
          <th
            class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            id
          </th>
          <th
            class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Title
          </th>
          <th
            class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Body
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="post in getPosts" :key="post.id" class="hover:bg-gray-200">
          <td class="px-4 py-2 border border-gray-200">{{ post.id }}</td>
          <td class="px-4 py-2 border border-gray-200">{{ post.title }}</td>
          <td class="px-4 py-2 border border-gray-200">{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
  </template>

  <div v-if="getLoadingState">Loading...</div>

  <div v-if="getPosts?.length === 0 && !getLoadingState" class="">
    Posts are not found
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePostsStore } from "~/stores/posts";
const postsStore = usePostsStore();

const { getPosts, getPage, getLoadingState } = storeToRefs(postsStore);
const { setLoadingState, setPosts, clearPosts } = postsStore;

const fetchPosts = async (url: string) => {
  setLoadingState(true);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(`Error message: ${error}`);
  } finally {
    setLoadingState(false);
  }
};

const { data: postsServerResponse } = await useAsyncData(
  "request-posts",
  () =>
    fetchPosts(
      `https://jsonplaceholder.typicode.com/posts?_page=${getPage.value}`,
    ),
  {
    watch: [getPage],
  },
);

watch(
  postsServerResponse,
  () => {
    if (getPage.value === 1) {
      clearPosts();
    }

    if (postsServerResponse.value) {
      setPosts(postsServerResponse.value);
    }
  },
  {
    immediate: true,
  },
);
</script>
