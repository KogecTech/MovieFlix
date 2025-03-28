"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import MovieActions from "@/components/Movies/MovieActions";

interface MovieDetail {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  // Add any additional properties as needed
}

interface MovieDetailsClientProps {
  id: string;
}

export default function MovieDetailsClient({ id }: MovieDetailsClientProps) {
  const { user, loading } = useAuth();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const router = useRouter();

  // Redirect non-authenticated users
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // Fetch movie details only if user is authenticated
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error: unknown) {
        console.error("Error fetching movie details:", error);
      }
    }
    if (user) {
      fetchMovieDetails();
    }
  }, [id, user, apiKey]);

  if (loading || !user || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div className="relative w-full h-80 mb-4">
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <p className="mb-4">{movie.overview}</p>
      <MovieActions movieId={movie.id} />
    </div>
  );
}
