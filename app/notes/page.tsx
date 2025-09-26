import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import css from "./NotesPage.module.css";

export default async function NotesPage() {
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12 }),
  });

  return (
    <main className={css.container}>
      <HydrationBoundary state={dehydrate(qc)}>
        <NotesClient />
      </HydrationBoundary>
    </main>
  );
}
