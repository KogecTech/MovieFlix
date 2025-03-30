"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import MovieActions from "@/components/Movies/MovieActions";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview?: string;
}

interface MovieCardProps {
  movie: Movie;
  onBookmark: (id: number) => void;
  onFavorite: (id: number) => void;
}

export default function MovieCard({ movie, onBookmark, onFavorite }: MovieCardProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleCardClick = () => router.push(`/movies/${movie.id}`);

  return (
    <div
      className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 w-full max-w-[250px]"
      onClick={handleCardClick}
    >
      {/* Poster Section */}
      <div className="relative h-[270px] w-full bg-gray-200">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-3 bg-white text-black">
        <h3 className="text-base font-semibold mb-1 line-clamp-1">
          {movie.title}
        </h3>
        {movie.overview && (
          <p className="text-xs text-gray-600 line-clamp-2">
            {movie.overview}
          </p>
        )}
        {user && (
          <MovieActions
            movieId={movie.id}
            onBookmark={onBookmark}
            onFavorite={onFavorite}
          />
        )}
      </div>
    </div>
  );
}
