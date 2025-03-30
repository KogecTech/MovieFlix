"use client";
import { useState, useEffect } from "react";
import MovieList from "@/components/Movies/MovieList";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview?: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [apiKey]);

  const handleBookmark = (id: number) => {
    // Implement bookmark logic here (update Firestore, local state, etc.)
    console.log("Bookmark movie ID:", id);
  };

  const handleFavorite = (id: number) => {
    // Implement favorite logic here
    console.log("Favorite movie ID:", id);
  };

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
      <MovieList
        movies={movies}
        onBookmark={handleBookmark}
        onFavorite={handleFavorite}
      />
    </main>
  );
}
