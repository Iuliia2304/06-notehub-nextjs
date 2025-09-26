import axios from "axios";
import type { CreateNoteDto, FetchNotesResponse, Note } from "@/types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? ""}`,
    "Content-Type": "application/json",
  },
});

export async function fetchNotes(params: { page?: number; perPage?: number; search?: string }) {
  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data;
}

export async function createNote(dto: CreateNoteDto): Promise<Note> {
  const { data } = await api.post<Note>("/notes", dto);
  return data;
}
export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}
export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

