"use client";
import { useState } from "react";
import NotesList from "@/components/NotesList";
import CreateNoteForm from "@/components/CreateNoteForm";
import EditNoteForm from "@/components/EditNoteForm";

const NotesPage = () => {
  const [editingNote, setEditingNote] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">GraphQL Notes</h1>
      <CreateNoteForm />
      {editingNote && <EditNoteForm note={editingNote} onClose={() => setEditingNote(null)} />}
      <NotesList onEdit={setEditingNote} />
    </div>
  );
};

export default NotesPage;
