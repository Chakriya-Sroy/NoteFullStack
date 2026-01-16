import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { CustomResponse, Note } from "../types";
import { apiFetch } from "../composables/useAPI";

export const useNoteStore = defineStore("stores", () => {
  const notes = ref<Note[]>([]);

  const getAllNotes = async (search?: string) => {
    try {
      const route = search ? `/notes?search=${search}` : "/notes";
      console.log("this is search",search)
      console.log("this is route",route)
      const response = (await apiFetch(route)) as CustomResponse<Note[]>;

      if (response?.success) {
        notes.value = response?.data ?? ([] as Note[]);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getNoteById = async (id: string) => {
    try {
      const response = (await apiFetch(`/notes/${id}`)) as CustomResponse<Note>;

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const createNewNote = async (payload: Note) => {
    try {
      const response = (await apiFetch(`/notes`, {
        body: JSON.stringify(payload),
        method: "POST",
      })) as CustomResponse<Note>;

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const updateNoteById = async (id: string, payload: Note) => {
    try {
      const response = (await apiFetch(`/notes/${id}`, {
        body: JSON.stringify(payload),
        method: "PUT",
      })) as CustomResponse<Note>;

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNoteById = async (id: string) => {
    try {
      const response = (await apiFetch(`/notes/${id}`, {
        method: "DELETE",
      })) as CustomResponse<Note>;

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    notes,

    getAllNotes,
    getNoteById,
    createNewNote,
    updateNoteById,
    deleteNoteById,
  };
});
