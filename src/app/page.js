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
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Your Notes:</h2>
        <NotesList 
          onEdit={setEditingNote} 
        />
      </div>
    </div>
  );
};

export default NotesPage;
