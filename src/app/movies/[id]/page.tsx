import React from "react";
import MovieDetailsClient from "./MovieDetailsClient";

export default function MovieDetailsPage(rawProps: unknown): React.JSX.Element {
  const { params } = rawProps as { params: { id: string } };
  return <MovieDetailsClient id={params.id} />;
}
