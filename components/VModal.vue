<template>
  <Transition name="modal">
    <div
      v-if="props.showModal"
      class="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-100 ease-in"
    >
      <div
        class="modal-container bg-white rounded-lg p-8 max-w-md mx-auto relative transition-all"
      >
        <span
          class="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-700 hover:rotate-45 transition-['colors', 'transform'] duration-100 ease-in-out cursor-pointer"
          @click="closeModalWindow"
          >&times;</span
        >
        <h2 class="mb-4 text-xl font-bold text-gray-900">
          <slot name="header">Modal header</slot>
        </h2>

        <form class="grid gap-8" @submit.prevent="handleSubmitPost">
          <VInput
            v-for="field in fields"
            :key="field"
            v-model="formData[field]"
            :input-field="field"
            :error-message="formDataErrors[field]"
          />

          <div :class="[isFormSent ? 'pointer-events-none' : '']">
            <VButton button-text="Create post" />
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "closeModal", isOpen: boolean): void;
}>();

const fields = ["userId", "title", "body"];

const formData = ref<FormFields>({
  userId: "",
  title: "",
  body: "",
});

const isFormSent = ref(false);

const resetFormFields = () => {
  formData.value.userId = "";
  formData.value.title = "";
  formData.value.body = "";
};

const validateUserId = computed(() => {
  const regexUserId = /^\d+$/;
  const userId = formData.value.userId.trim();

  if (!userId) {
    return "UserId required";
  }

  if (userId.length === 1 && +userId === 0) {
    return "UserId must be positive number";
  }

  if (!regexUserId.test(userId)) {
    console.log("userId", userId);
    return "UserId must be positive number";
  }
  return "";
});

const validateTitle = computed(() => {
  const title = formData.value.title.trim();

  if (!title) {
    return "Title is required";
  }

  if (title.length < 2) {
    return "Enter min 2 symbols";
  }

  return "";
});

const validateBody = computed(() => {
  const body = formData.value.body.trim();

  if (!body) {
    return "Body is required";
  }

  if (body.length < 10) {
    return "Body must be at least 10 symbols";
  }

  return "";
});

const formDataErrors = computed<FormFields>(() => {
  return {
    userId: validateUserId.value,
    title: validateTitle.value,
    body: validateBody.value,
  };
});

const closeModalWindow = () => {
  emit("closeModal", false);

  resetFormFields();
};

const sendPost = async () => {
  isFormSent.value = true; // Prevent multiple data submission

  try {
    const url = "https://jsonplaceholder.typicode.com/posts";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData.value),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setTimeout(() => {
      resetFormFields();
    }, 33);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    $toast.success("Post successfully sent");
    return data;
  } catch (error) {
    $toast.error("Failed to create post");
    console.error(error);
  } finally {
    isFormSent.value = false; // Enable send button
  }
};

const handleSubmitPost = (event: Event) => {
  event.preventDefault();

  if (
    formDataErrors.value.userId !== "" ||
    formDataErrors.value.title !== "" ||
    formDataErrors.value.body !== ""
  ) {
    $toast.error("All fields to be correct");
    return;
  }

  sendPost();

  closeModalWindow();
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
