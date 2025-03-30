"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import MovieList from "@/components/Movies/MovieList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MovieDetail {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookmarkedMovies, setBookmarkedMovies] = useState<MovieDetail[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<MovieDetail[]>([]);
  const [fetching, setFetching] = useState(true);
  const [updateFlag, setUpdateFlag] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchUserMovies() {
      if (!user) {
        setFetching(false);
        return;
      }
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          const bookmarks: number[] = data.bookmarks || [];
          const favorites: number[] = data.favorites || [];

          const fetchMovie = async (movieId: number): Promise<MovieDetail> => {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
            );
            return res.json();
          };

          const bookmarkedPromises = bookmarks.map(fetchMovie);
          const favoritePromises = favorites.map(fetchMovie);

          const [bookmarked, favorited] = await Promise.all([
            Promise.all(bookmarkedPromises),
            Promise.all(favoritePromises),
          ]);
          setBookmarkedMovies(bookmarked);
          setFavoriteMovies(favorited);
        } else {
          await setDoc(doc(db, "users", user.uid), { bookmarks: [], favorites: [] });
          setBookmarkedMovies([]);
          setFavoriteMovies([]);
        }
      } catch (error: unknown) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setFetching(false);
      }
    }
    if (!loading) {
      fetchUserMovies();
    }
  }, [user, loading, apiKey, updateFlag]);

  const handleBookmark = (id: number) => {
    console.log("Bookmark action occurred for movie ID:", id);
    setUpdateFlag((prev) => !prev);
  };

  const handleFavorite = (id: number) => {
    console.log("Favorite action occurred for movie ID:", id);
    setUpdateFlag((prev) => !prev);
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Dashboard</CardTitle>
        </CardHeader>
      </Card>
      <section className="mb-8">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Bookmarked Movies</CardTitle>
          </CardHeader>
          <CardContent>
            {bookmarkedMovies.length > 0 ? (
              <MovieList
                movies={bookmarkedMovies}
                onBookmark={handleBookmark}
                onFavorite={handleFavorite}
              />
            ) : (
              <p>No bookmarked movies.</p>
            )}
          </CardContent>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Favorite Movies</CardTitle>
          </CardHeader>
          <CardContent>
            {favoriteMovies.length > 0 ? (
              <MovieList
                movies={favoriteMovies}
                onBookmark={handleBookmark}
                onFavorite={handleFavorite}
              />
            ) : (
              <p>No favorite movies.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
