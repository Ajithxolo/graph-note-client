// CreateNoteForm.js
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
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Note</h2>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg">
            Error: {error.message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Note content"
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNoteForm;