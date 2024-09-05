<template>
  <VModal @close-modal="closeModalWindow">
    <template #header> Modal header </template>

    <template #default>
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
    </template>
  </VModal>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();

const emit = defineEmits<{
  (e: "closeModalCreatePost", value: boolean): void;
}>();

const fields = ["userId", "title", "body"];

const formData = ref<FormFields>({
  userId: "",
  title: "",
  body: "",
});

const isFormSent = ref(false);

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

const resetFormFields = () => {
  formData.value.userId = "";
  formData.value.title = "";
  formData.value.body = "";
};

const closeModalWindow = () => {
  emit("closeModalCreatePost", false);
  resetFormFields();
};

const sendPost = async () => {
  isFormSent.value = true; // Prevent multiple submissions

  try {
    const url = "https://jsonplaceholder.typicode.com/posts";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData.value),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

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
    isFormSent.value = false; // Enable the send button
  }
};

const handleSubmitPost = (event: Event) => {
  event.preventDefault();

  if (
    formDataErrors.value.userId !== "" ||
    formDataErrors.value.title !== "" ||
    formDataErrors.value.body !== ""
  ) {
    $toast.error("All fields must be correct");
    return;
  }

  sendPost();
  closeModalWindow();
};
</script>
