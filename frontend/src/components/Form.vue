<script setup lang="ts">
import type { Error, FormPayload, Note } from "../types/index";
import { ref } from "vue";

interface Props {
  initialValue?: Note;
  mode?: "CRATE" | "UPDATE";
}

const props = withDefaults(defineProps<Props>(), {
  mode: "CRATE",
});

const state = ref<Partial<Note>>({
  id: props.initialValue?.id ?? "",
  title: props.initialValue?.title ?? "",
  content: props.initialValue?.content ?? "",
});

const handleContentChange = (e: Event) => {
  const content = e.target as HTMLSelectElement;
  state.value.content = content.value;
};

const validation = () => {
  const errors: Error[] = [];

  if (state.value?.title?.trim() === "") {
    errors.push({ path: "title", message: "Title is required" });
  }
  if (errors.length > 0) {
    return { valid: false, errors: errors, data: state.value } as FormPayload;
  }
  return { valid: true, errors: [], data: state.value } as FormPayload;
};

const emits = defineEmits(["submit"]);

const handleSubmitForm = async () => {
  const payload = validation() as FormPayload;
  if (!payload.valid) {
    showTitleErrorMessage.value = payload.errors[0]?.message ?? "";
    return;
  }
  emits("submit", payload);
};

const form=ref();

const showTitleErrorMessage = ref("");

const handleRequestSubmit=()=>{
  form.value?.requestSubmit();
}

defineExpose({
  submit:handleRequestSubmit
})
</script>
<template>
  <form @submit.prevent="handleSubmitForm" class="form flex flex-col gap-4" ref="form">
    <div class="formfield flex flex-col gap-2">
      <label for="title">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        v-model="state.title"
        @input="
          (val) => {
            if (state.title?.trim() === '') {
              showTitleErrorMessage = 'Title is required';
            } else {
              showTitleErrorMessage = '';
            }
          }
        "
        class="flex-1 border border-gray-100 rounded-md p-2"
      />
      <p class="text-red-500 text-xs" v-if="showTitleErrorMessage">
        {{ showTitleErrorMessage }}
      </p>
    </div>
    <div class="formfield flex flex-col gap-2">
      <label for="content">Content</label>
      <textarea
        rows="2"
        :value="state.content"
        @change="handleContentChange"
        placeholder="Content"
        class="flex-1 border border-gray-100 rounded-md p-2"
      />
    </div>
  </form>
</template>

<style scoped></style>
