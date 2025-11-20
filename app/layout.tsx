import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exam Prep Hub - Your Ultimate Study Companion",
  description: "Master your exams with MCQ practice, flashcards, and comprehensive theory notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
