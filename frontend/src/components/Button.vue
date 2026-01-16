<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label?: string;
  color?: "primary" | "error" | "neutral" | "success";
  variant?: "solid" | "subtle";
}

const props = withDefaults(defineProps<Props>(), {
  color: "primary",
  variant: "solid",
});

const dynamicClass = computed(() => {
  switch (props.color) {
    case "primary":
      return props.variant === "solid"
        ? "bg-blue-500 hover:bg-blue-600 text-white"
        : "text-blue-500 hover:bg-blue-50";

    case "error":
      return props.variant === "solid"
        ? "bg-red-500 hover:bg-red-600 text-white"
        : "text-red-500 hover:bg-red-50";

    case "success":
      return props.variant === "solid"
        ? "bg-green-500 hover:bg-green-600 text-white"
        : "text-green-500 hover:bg-green-50";

    case "neutral":
      return props.variant === "solid"
        ? "bg-gray-100 hover:bg-gray-200"
        : "text-gray-500 hover:bg-gray-50";

    default:
      return "";
  }
});
</script>

<template>
  <button
    class="flex flex-row gap-2 justify-center items-center p-2 rounded-sm cursor-pointer"
    :class="dynamicClass"
    v-bind="$attrs"
  >
    <slot name="default">
      <slot name="icon"></slot>
      {{ props.label }}
    </slot>
  </button>
</template>

<style scoped></style>
