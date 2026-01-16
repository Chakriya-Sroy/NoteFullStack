<script setup lang="ts">
import { XIcon } from "lucide-vue-next";

const show = defineModel("show", { default: false });
interface Props {
  title?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-50"
    @click.self="show = false"
  >
    <slot name="content">
      <div
        class="bg-white border border-gray-100 rounded-lg min-w-sm h-auto flex flex-col gap-4 p-4"
      >
        <slot name="header">
          <div class="flex flex-row items-center justify-between">
            <h3 v-if="props?.title">{{ props?.title }}</h3>

            <button @click="show = false" class="cursor-pointer ms-auto">
              <XIcon :size="20" />
            </button>
          </div>
        </slot>

        <slot></slot>
      </div>
    </slot>
  </div>
</template>

<style scoped></style>
