<template>
  <template v-if="getPosts && !getLoadingState">
    <div class="relative">
      <table
        class="table-auto mt-10 text-left border-collapse border border-gray-200"
      >
        <caption
          class="mb-16 md:mb-4 text-2xl font-bold text-gray-800 text-left"
        >
          Posts form JSONplaceholder
        </caption>

        <thead>
          <tr class="bg-gray-100">
            <th
              v-for="key in tableKeys"
              :key="key"
              class="px-4 py-2 text-xs font-medium text-gray-500 capitalize tracking-wider"
            >
              {{ key }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="post in getPosts"
            :key="post.id"
            class="hover:bg-gray-200 transition-colors duration-500 ease-linear"
          >
            <td
              v-for="key in tableKeys"
              :key="key"
              class="px-4 py-2 border border-gray-200"
            >
              {{ post[key as labelsGroup] }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="absolute top-9 md:top-0 left-auto md:right-0 flex gap-4">
        <VButton text-button="Load more" @click="incrementPage" />

        <VButton text-button="Create post" />
      </div>
    </div>
  </template>

  <div v-if="getLoadingState">
    <VLoader />
  </div>

  <div v-if="getPosts?.length === 0 && !getLoadingState">
    Posts are not found
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePostsStore } from "~/stores/posts";
const postsStore = usePostsStore();

const { getPosts, getPage, getLoadingState } = storeToRefs(postsStore);
const { setLoadingState, setPosts, clearPosts, incrementPage } = postsStore;

const tableKeys: labelsGroup[] = ["id", "title", "body"];

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
