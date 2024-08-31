import { defineStore } from "pinia";
interface PostsStore {
  posts: Post[];
  page: number;
  isLoading: boolean;
}

export const usePostsStore = defineStore("posts", {
  state: (): PostsStore => ({
    posts: [],
    page: 1,
    isLoading: false,
  }),
  getters: {
    getPosts: (state) => state.posts,
    getPage: (state) => state.page,
    getLoadingState: (state) => state.isLoading,
  },
  actions: {
    incrementPage() {
      this.page++;
    },
    setPosts(postsFromServer: Post[]) {
      this.posts.push(...JSON.parse(JSON.stringify(postsFromServer)));
    },
    setLoadingState(state: boolean) {
      this.isLoading = state;
    },
    clearPosts() {
      this.posts = [];
    },
  },
});
