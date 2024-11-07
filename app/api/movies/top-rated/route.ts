// app/api/movies/top-rated/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    }
  };

  try {
    const response = await fetch(apiUrl, options);

    // Vérifie que la réponse est correcte
    if (!response.ok) {
      throw new Error(`Erreur de récupération : ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des films les mieux notés :", error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des films les mieux notés' }, { status: 500 });
  }
}