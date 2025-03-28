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

interface MovieActionsProps {
  movieId: number;
}

const MovieActions = ({ movieId }: MovieActionsProps) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  // Fetch user's bookmark and favorite status from Firestore.
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
    } catch (error: unknown) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={toggleBookmark}
        className="flex-1 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {bookmarked ? "Remove Bookmark" : "Bookmark"}
      </button>
      <button
        onClick={toggleFavorite}
        className="flex-1 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {favorited ? "Remove Favorite" : "Favorite"}
      </button>
    </div>
  );
};

export default MovieActions;
