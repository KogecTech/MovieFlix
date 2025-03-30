"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
}

const SearchBar = ({ onSearch, disabled = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        disabled={disabled}
        className="bg-pink-200 text-black rounded-full py-2 px-4 w-64 placeholder-gray-600 focus:outline-none disabled:bg-gray-200"
      />
      <Button
        type="submit"
        disabled={disabled}
        className="absolute right-1 top-1 bg-transparent hover:bg-transparent text-gray-600 p-1 disabled:text-gray-400"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </Button>
    </form>
  );
};

export default SearchBar;
