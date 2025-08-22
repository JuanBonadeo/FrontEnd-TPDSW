"use client"




export async function getMovieById(id) {
  const response = await fetch(`https://api.example.com/movies/${id}`);
  

  

  return response
}
