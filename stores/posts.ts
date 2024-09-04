import { defineStore } from "pinia";
interface PostsStore {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
}

export const usePostsStore = defineStore("posts", {
  state: (): PostsStore => ({
    posts: [],
    currentPage: 1,
    totalPages: 10,
    isLoading: false,
  }),
  getters: {
    getPosts: (state) => state.posts,
    getCurrentPage: (state) => state.currentPage,
    getTotalPages: (state) => state.totalPages,
    getLoadingState: (state) => state.isLoading,
  },
  actions: {
    incrementPage() {
      if (this.isLoading) {
        return;
      }
      this.currentPage++;
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
    setCurrentPage(pageNumber: number) {
      this.currentPage = pageNumber;
    },
  },
});
