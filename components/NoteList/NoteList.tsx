"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";

export default function NoteList({ notes }: { notes: Note[] }) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onMutate: (id) => setDeletingId(id),
    onSettled: () => setDeletingId(null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes || notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content ?? ""}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>

            <button
              className={css.button}
              onClick={() => deleteMut.mutate(note.id)}
              disabled={deletingId === note.id}
            >
              {deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
