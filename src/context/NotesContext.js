// src/context/NotesContext.js
"use client";
import { createContext, useState, useContext } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [noteCount, setNoteCount] = useState(0);
  
  return (
    <NotesContext.Provider value={{ noteCount, setNoteCount }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);