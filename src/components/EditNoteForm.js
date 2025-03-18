"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_NOTE } from "@/graphql/mutations";
import { FETCH_NOTES } from "@/graphql/queries";

const EditNoteForm = ({ note, onClose }) => {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: FETCH_NOTES }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNote({ variables: { id: note.id, title, body } });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3>Edit Note</h3>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full p-2 border my-2" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} className="block w-full p-2 border my-2"></textarea>
      <button type="submit" disabled={loading} className="btn btn-primary">{loading ? "Updating..." : "Update Note"}</button>
      <button type="button" onClick={onClose} className="btn btn-secondary ml-2">Cancel</button>
    </form>
  );
};

export default EditNoteForm;
