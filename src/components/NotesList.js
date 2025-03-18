"use client";
import { useQuery } from "@apollo/client";
import { FETCH_NOTES } from "@/graphql/queries";

export default function NotesList() {
  const { data, loading, error } = useQuery(FETCH_NOTES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.fetchNotes) return <p>No notes found.</p>;

  return (
    <ul>
      {data.fetchNotes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <p>
            Sentiment: {note.sentimentLabel} ({note.sentimentScore})
          </p>
        </li>
      ))}
    </ul>
  );
}