"use client";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { FETCH_NOTES } from "@/graphql/queries";
import DeleteNoteButton from "@/components/DeleteNoteButton";
import { useNotes } from "@/context/NotesContext";

export default function NotesList({ onEdit  }) {
  const { data, loading, error } = useQuery(FETCH_NOTES);
  const { setNoteCount } = useNotes();
  useEffect(() => {
    if (data && data.fetchNotes) {
      setNoteCount(data.fetchNotes.length);
    }
  }, [data, setNoteCount]);
  if (loading) return <p className="text-gray-500">Loading notes...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!data || !data.fetchNotes) return <p className="text-gray-500">No notes found.</p>;

  return (
    <ul className="space-y-4">
      {data.fetchNotes.map((note) => (
        <li 
          key={note.id}
          className="p-4 border rounded-lg shadow-sm bg-white"
        >
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-black">{note.title}</h3>
            <p className="text-gray-600 mt-1 text-black">{note.body}</p>
            <div className="mt-2 text-sm text-gray-500">
              <span>Sentiment: {note.sentimentLabel} </span>
              <span>({note.sentimentScore})</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onEdit(note)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Edit
            </button>
            <DeleteNoteButton noteId={note.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}