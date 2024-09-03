<template>
  <label class="relative">
    <input
      v-model="fieldValue"
      type="text"
      :placeholder="props.inputField"
      :class="[
        props.errorMessage !== '' ? 'border-red-500' : '',
        props.errorMessage !== '' ? 'text-red-500' : '',
      ]"
      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div
      v-if="props.errorMessage !== ''"
      class="absolute top-100 text-sm text-red-600"
    >
      {{ props.errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  inputField: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    required: true,
  },
});

const fieldValue = defineModel<FormFields>();
</script>
