import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "MovieFlix",
  description: "Generated by RTG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-background text-textPrimary">
          <Navbar />
          <main>
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
