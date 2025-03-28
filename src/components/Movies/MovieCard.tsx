import React from "react";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="bg-white rounded overflow-hidden shadow-md">
      {movie.poster_path ? (
        <div className="relative w-full h-80">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="bg-gray-300 w-full h-80 flex items-center justify-center">
          No Image
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold">{movie.title}</h2>
      </div>
    </div>
  );
};

export default MovieCard;
