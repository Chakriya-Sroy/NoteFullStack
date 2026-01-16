<script setup lang="ts">
import { ArrowUpDown, Pen, Plus, Search, StickyNote } from "lucide-vue-next";
import Button from "./Button.vue";
import { ref, watch } from "vue";
import type { Note } from "../types";

interface Props {
  items: Note[];
}

const props = defineProps<Props>();

const open = defineModel("open", { default: false });

const emits = defineEmits(["add", "search","sort"]);

const search = ref("");

let timeout: ReturnType<typeof setTimeout> | null = null;

watch(search, (newVal) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    emits("search", newVal);
  }, 1000); //
});

const sortOrder = ref<"asc" | "desc">("asc");

const handleSort=()=>{
   sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
   emits('sort',sortOrder.value)
}
</script>

<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center gap-4"
    v-if="props.items?.length === 0 && search === ''"
  >
    <StickyNote :size="100" class="text-gray-300" />
    <h1>No notes yet. Create your first note!</h1>

    <Button @click="emits('add')">
      <Plus :size="20" />
      Add New Note
    </Button>
  </div>
  <div
    class="grid grid-cols-1 sm:grid-cols-3 w-full h-screen bg-gray-50 overflow-hidden"
    v-else
  >
    <div
      class="grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-4 overflow-hidden w-full justify-between p-4 bg-white"
    >
      <div class="flex flex-col justify-start gap-4">
        <div class="flex flex-row justify-between items-center">
          <p class="font-bold">All Notes</p>
          <ArrowUpDown
            :size="20"
            class="text-gray-400 hover:text-gray-500 cursor-pointer"
            @click="handleSort"
          />
        </div>
        <div
          class="relative flex items-center border border-gray-100 rounded-md"
        >
          <Search class="text-gray-300 absolute top-auto bottom-auto left-2" />
          <input
            type="text"
            placeholder="Search"
            v-model="search"
            class="w-full h-full p-2 indent-10"
          />
        </div>
      </div>

      <slot name="sidebar-items" :items="props.items">
        <div class="overflow-scroll flex flex-col gap-2 scrollbar-width-none">
          <template v-for="item in props.items">
            <slot name="item" :item="item"></slot>
          </template>
        </div>
      </slot>
      <Button @click="emits('add')">
        <Plus :size="20" />
        Add New Note
      </Button>
    </div>
    <div
      class="sm:col-span-2 border border-gray-200 overflow-auto"
      :class="open ? 'fixed sm:relative inset-0  bg-white ' : 'sm:block hidden'"
    >
      <div class="p-4" v-if="open">
        <slot name="previewSelection"></slot>
      </div>
      <div
        class="flex flex-col justify-center items-center h-full text-gray-300 gap-4"
        v-else
      >
        <Pen :size="70"></Pen>
        <p class="text-lg">Select a note to view details</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-width-none {
  scrollbar-width: none;
}
</style>
