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
  release_date?: string;
  runtime?: number;
  vote_average?: number;
  tagline?: string;
  genres?: Array<{ id: number; name: string }>;
}

interface MovieDetailsClientProps {
  id: string;
}

export default function MovieDetailsClient({ id }: MovieDetailsClientProps) {
  const { user, loading } = useAuth();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        Loading...
      </div>
    );
  }

  const { title, poster_path, overview, release_date, runtime, vote_average, tagline, genres } = movie;
  const year = release_date ? release_date.split("-")[0] : "N/A";
  const genreNames = genres?.map((g) => g.name).join(", ") || "N/A";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col md:flex-row gap-8">
      {/* Poster Section */}
      <div className="relative w-full md:w-1/3 h-[450px] rounded-lg overflow-hidden shadow-lg">
        {poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-700">
            No Image
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex-1 flex flex-col">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {tagline && (
          <h2 className="text-lg italic text-gray-300 mb-4">&quot;{tagline}&quot;</h2>
        )}
        <div className="flex gap-4 mb-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Watch
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
            Download
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Storyline</h3>
          <p className="text-gray-300">{overview}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 mb-4">
          <div>
            <p className="text-gray-400">Rating:</p>
            <p className="font-medium">{vote_average || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400">Year:</p>
            <p className="font-medium">{year}</p>
          </div>
          <div>
            <p className="text-gray-400">Genres:</p>
            <p className="font-medium">{genreNames}</p>
          </div>
          <div>
            <p className="text-gray-400">Runtime:</p>
            <p className="font-medium">{runtime ? `${runtime} min` : "N/A"}</p>
          </div>
        </div>
        <div className="mt-auto">
          <MovieActions movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}
