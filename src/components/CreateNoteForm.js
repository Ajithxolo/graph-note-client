"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE } from "@/graphql/mutations";
import { FETCH_NOTES } from "@/graphql/queries";

const CreateNoteForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: FETCH_NOTES }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote({ variables: { title, body } });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3>Create a Note</h3>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="block w-full p-2 border my-2" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" required className="block w-full p-2 border my-2"></textarea>
      <button type="submit" disabled={loading} className="btn btn-success">{loading ? "Creating..." : "Create Note"}</button>
    </form>
  );
};

export default CreateNoteForm;
