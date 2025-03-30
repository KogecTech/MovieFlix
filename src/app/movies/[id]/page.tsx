"use client";
import { useParams } from "next/navigation";
import MovieDetailsClient from "./MovieDetailsClient";


export default function MovieDetailsPage() {
  const params = useParams(); // Ensure params are retrieved correctly

  if (!params?.id) {
    return <p className="text-center mt-8 text-red-500">Invalid Movie ID</p>;
  }

  return <MovieDetailsClient id={params.id as string} />;
}
