// EditNoteForm.js
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
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Edit Note</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

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
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;