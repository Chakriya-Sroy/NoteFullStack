<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import NoteCard from "./components/NoteCard.vue";
import Modal from "./components/Modal.vue";
import { ArrowLeft, CalendarPlus, Clock, Pen, Trash2 } from "lucide-vue-next";
import { formatDate } from "./utils/formatTime";
import CustomLayout from "./components/CustomLayout.vue";
import Button from "./components/Button.vue";
import type { FormPayload, Note } from "./types";
import Form from "./components/Form.vue";
import { useNoteStore } from "./stores/note";
import { storeToRefs } from "pinia";
import { customToastPlugin } from "./plugins/useToast";

const showCreateModal = ref(false);
const showUpdateModal = ref(false);
const showDeleteModal = ref(false);
const openNote = ref(false);

const selectedNote = ref<Note>();

const store = useNoteStore();

const { notes } = storeToRefs(store);

const { success, error } = customToastPlugin();

const {
  getAllNotes,
  getNoteById,
  updateNoteById,
  createNewNote,
  deleteNoteById,
} = store;

const handleOpenNote = async (id: string) => {
  openNote.value = true;
  const res = await getNoteById(id);
  if (res?.success) {
    selectedNote.value = res?.data;
  }
};

const handleAddNewNote = async (payload: FormPayload) => {
  const data = payload.data;
  const res = await createNewNote(data);
  if (res?.success) {
    showCreateModal.value = false;
    success(res?.message);
    await getAllNotes();
  } else {
    error(res?.message ?? "Fail To Create Note");
  }
};

const handleUpdateNote = async (payload: FormPayload) => {
  const id = selectedNote.value?.id as string;
  const data = payload.data;
  const res = await updateNoteById(id, data);
  if (res?.success) {
    showUpdateModal.value = false;
    selectedNote.value = res?.data;
    success(res?.message);
    await getAllNotes();
  } else {
    error(res?.message ?? "Fail To Update Note");
  }
};

const handleDeleteNote = async () => {
  const id = selectedNote.value?.id as string;
  const res = await deleteNoteById(id);
  if (res?.success) {
    showDeleteModal.value = false;
    openNote.value = false;
    success(res?.message);
    await getAllNotes();
  } else {
    error(res?.message ?? "Fail To Delete Note");
  }
};

const form = ref();

const closePreview = () => {
  openNote.value = false;
  selectedNote.value = {} as Note;
};

const handleSearch = async (val: string) => {
  await getAllNotes(val);
};

const handleSort = (order: string) => {
  const sorted = [...notes.value].sort((a, b) =>
    order === "asc"
      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  notes.value = sorted;
};

onMounted(async () => {
  await getAllNotes();
});
</script>

<template>
  <CustomLayout
    v-model:open="openNote"
    :items="notes"
    @add="showCreateModal = true"
    @search="handleSearch"
    @sort="handleSort"
  >
    <template #item="{ item: note }">
      <NoteCard
        :id="note.id"
        :title="note.title"
        :content="note?.content"
        :key="note.id"
        :created-at="note?.createdAt"
        :class="
          note.id === selectedNote?.id ? 'bg-blue-50! border-blue-100!' : ''
        "
        @click="handleOpenNote"
      />
    </template>
    <template #previewSelection>
      <div class="flex flex-row items-center justify-between mb-6">
        <Button color="neutral" variant="subtle" @click="closePreview">
          <ArrowLeft :size="20" />
          Back
        </Button>

        <div class="flex flex-row gap-4">
          <Button
            @click="showUpdateModal = true"
            color="success"
            variant="subtle"
          >
            <Pen :size="20" />
            Edit
          </Button>

          <Button
            @click="showDeleteModal = true"
            color="error"
            variant="subtle"
          >
            <Trash2 :size="20" />
            Delete
          </Button>
        </div>
      </div>
      <p
        class="line-clamp-1 text-gray-400 text-xs flex justify-start items-center gap-2"
      >
        <Clock :size="12"></Clock> Created on
        {{ formatDate(selectedNote?.createdAt) }}
      </p>
      <p
        class="line-clamp-1 text-gray-400 text-xs flex justify-start items-center gap-2"
      >
        <CalendarPlus :size="12" /> Last edited on
        {{ formatDate(selectedNote?.updatedAt) }}
      </p>
      <p class="font-bold text-md my-4">{{ selectedNote?.title }}</p>
      <p class="text-sm my-4">{{ selectedNote?.content }}</p>
    </template>
  </CustomLayout>

  <Modal v-model:show="showCreateModal">
    <Form ref="form" @submit="handleAddNewNote" />
    <div class="flex flex-row justify-end gap-4">
      <Button
        color="neutral"
        variant="subtle"
        @click="showCreateModal = false"
        label="Cancel"
      >
      </Button>

      <Button color="primary" label="Save" @click="form?.submit()"></Button>
    </div>
  </Modal>
  <Modal v-model:show="showUpdateModal">
    <Form
      ref="form"
      mode="UPDATE"
      :initial-value="selectedNote"
      @submit="handleUpdateNote"
    />
    <div class="flex flex-row justify-end gap-4">
      <Button
        color="neutral"
        variant="subtle"
        @click="showUpdateModal = false"
        label="Cancel"
      >
      </Button>
      <Button color="success" label="Update" @click="form?.submit()"></Button>
    </div>
  </Modal>
  <Modal v-model:show="showDeleteModal">
    <h1>Confirm Deletion</h1>
    <p>Are you sure u wnat to delete this note {{ selectedNote?.title }}</p>
    <div class="flex flex-row gap-2 justify-end">
      <Button
        color="neutral"
        variant="subtle"
        @click="showDeleteModal = false"
        label="Cancel"
      >
      </Button>
      <Button color="error" label="Delete" @click="handleDeleteNote"></Button>
    </div>
  </Modal>
</template>

<style scoped></style>
