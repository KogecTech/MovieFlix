"use client";
import { useState, useEffect } from "react";
import MovieList from "@/components/Movies/MovieList";
import SearchBar from "@/components/SearchBar";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview?: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            query
          )}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, [query, apiKey]);

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
      <SearchBar onSearch={setQuery} />
      <MovieList movies={movies} />
    </main>
  );
}
