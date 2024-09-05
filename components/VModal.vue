<template>
  <Transition name="modal">
    <div
      v-if="modalState"
      class="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-100 ease-in"
    >
      <div
        class="modal-container bg-white rounded-lg p-8 max-w-md mx-auto relative transition-all"
      >
        <span
          class="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-700 hover:rotate-45 transition-['colors', 'transform'] duration-100 ease-in-out cursor-pointer"
          @click="closeModal"
          >&times;</span
        >
        <h2 class="mb-4 text-xl font-bold text-gray-900">
          <slot name="header"></slot>
        </h2>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const modalState = inject("isModalOpen");

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
