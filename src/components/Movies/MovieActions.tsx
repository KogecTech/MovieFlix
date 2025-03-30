"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button"; // Imported shadcn UI Button

interface MovieActionsProps {
  movieId: number;
  onBookmark?: (id: number) => void;
  onFavorite?: (id: number) => void;
}

const MovieActions = ({ movieId, onBookmark, onFavorite }: MovieActionsProps) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const fetchUserActions = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setBookmarked(
            Array.isArray(userData.bookmarks) && userData.bookmarks.includes(movieId)
          );
          setFavorited(
            Array.isArray(userData.favorites) && userData.favorites.includes(movieId)
          );
        } else {
          // If user doc doesn't exist, initialize it.
          await setDoc(userDocRef, { bookmarks: [], favorites: [] });
        }
      }
    };
    fetchUserActions();
  }, [user, movieId]);

  const toggleBookmark = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    try {
      if (bookmarked) {
        await updateDoc(userDocRef, {
          bookmarks: arrayRemove(movieId),
        });
        setBookmarked(false);
      } else {
        await updateDoc(userDocRef, {
          bookmarks: arrayUnion(movieId),
        });
        setBookmarked(true);
      }
      if(onBookmark) {
        onBookmark(movieId);
      }
    } catch (error: unknown) {
      console.error("Error updating bookmarks:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    try {
      if (favorited) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(movieId),
        });
        setFavorited(false);
      } else {
        await updateDoc(userDocRef, {
          favorites: arrayUnion(movieId),
        });
        setFavorited(true);
      }
      if(onFavorite) {
        onFavorite(movieId);
      }
    } catch (error: unknown) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className="flex gap-2 mt-3">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark();
        }}
        className="flex-1 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {bookmarked ? "Remove Bookmark" : "Bookmark"}
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        className="flex-1 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {favorited ? "Remove Favorite" : "Favorite"}
      </Button>
    </div>
  );
};

export default MovieActions;
