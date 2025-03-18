// src/app/layout.js
"use client";
import ClientProviders from "./ClientProviders";
import { NotesProvider } from "../context/NotesContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <NotesProvider>{children}</NotesProvider>
        </ClientProviders>
      </body>
    </html>
  );
}