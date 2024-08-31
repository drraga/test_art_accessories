<template>
  <template v-if="posts">
    <table class="table-auto w-full max-w-screen-xl mt-10 text-left border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">id</th>
          <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="post in posts" :key="post.id"  class="hover:bg-gray-200">
          <td class="px-4 py-2 border border-gray-200">{{ post.id }}</td>
          <td class="px-4 py-2 border border-gray-200">{{ post.title }}</td>
          <td class="px-4 py-2 border border-gray-200">{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
  </template>

  <div v-if="isLoading"> Loading...</div>

  <div v-if="posts?.length === 0 && !isLoading">Posts are not found</div>
</template>

<script setup lang="ts">
const isLoading = ref(false);
const posts = ref <Post[] | null>(null);
const error = ref()

const fetchPosts = async (url:string) => {
  isLoading.value = true
  try {
    const response = await fetch(url);

    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    } else {
      const data = await response.json()
      return data;
    }
  } catch (error) {
    console.error(`Error message: ${error}`)
  } finally {
    isLoading.value = false
  }
}

const { data: postsServerResponse, error: fetchError } = await useAsyncData('posts', () => fetchPosts('https://jsonplaceholder.typicode.com/posts'))

if(fetchError.value) {
error.value = fetchError.value
} else {
  posts.value = postsServerResponse.value
}

</script>