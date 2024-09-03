<template>
  <label>
    <input :type="props.inputType" :placeholder="props.inputType" />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  inputType: {
    type: String,
    required: true,
  },
});
</script>
