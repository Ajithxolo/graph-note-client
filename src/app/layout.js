// src/app/layout.js
"use client";
import { ChakraProvider } from '@chakra-ui/react'
import ClientProviders from "./ClientProviders";
import { NotesProvider } from "../context/NotesContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientProviders>
          <ChakraProvider><NotesProvider>{children}</NotesProvider></ChakraProvider>
        </ClientProviders>
      </body>
    </html>
  );
}