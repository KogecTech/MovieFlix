import React from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
