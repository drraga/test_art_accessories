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
          <tr class="table__header bg-gray-100">
            <th
              v-for="(key, i) in tableKeys"
              :key="i"
              class="px-4 py-2 text-xs font-medium text-gray-500 capitalize tracking-wider relative"
              :class="{
                'pointer-events-none': i !== 0,
                'cursor-pointer': i === 0,
                'is-descending': isDescending,
              }"
              @click="isDescending = !isDescending"
            >
              {{ key }}
            </th>
          </tr>
        </thead>

        <tbody>
          <TransitionGroup name="fade">
            <tr
              v-for="post in sortedPostsByIds"
              :key="post.id"
              class="hover:bg-gray-200 transition-all duration-500 ease-linear"
            >
              <td
                v-for="key in tableKeys"
                :key="key"
                class="item px-4 py-2 transition-all"
              >
                {{ post[key as labelsGroup] }}
              </td>
            </tr>
          </TransitionGroup>
        </tbody>
      </table>

      <div class="absolute top-9 md:top-0 left-auto md:right-0 flex gap-4">
        <VButton button-text="Load more" @click="incrementPage" />

        <VButton button-text="Create post" @click="isModalOpen = true" />
      </div>
    </div>

    <Teleport to="body">
      <VModal
        :show-modal="isModalOpen"
        @close-modal="(value) => (isModalOpen = value)"
      >
        <template #header>Create post</template>
      </VModal>
    </Teleport>
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
import VModal from "./VModal.vue";
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

const isDescending = ref(false);

const sortedPostsByIds = computed(() => {
  if (isDescending.value) {
    return getPosts.value.toSorted((a, b) => b.id - a.id);
  }

  return getPosts.value;
});

const isModalOpen = ref(false);
</script>

<style scoped>
.table__header > th:first-child::after {
  content: " ";
  position: absolute;
  width: 0.375rem;
  height: 0.375rem;
  top: 50%;
  right: 10%;
  border-left: 0.125rem solid #000;
  border-bottom: 0.125rem solid #000;
  transform: translateY(-50%) rotate(-45deg);
  transition: transform 0.35s ease-in-out;
}

.table__header > th.is-descending:first-child::after {
  transform: translateY(-50%) rotate(-225deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(2rem, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
