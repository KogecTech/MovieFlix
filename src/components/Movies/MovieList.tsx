"use client";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview?: string;
}

interface MovieListProps {
  movies: Movie[];
  onBookmark: (id: number) => void;
  onFavorite: (id: number) => void;
}

export default function MovieList({ movies, onBookmark, onFavorite }: MovieListProps) {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No movies found.</p>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onBookmark={onBookmark}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    </div>
  );
}
