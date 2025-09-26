import React from 'react'
import { Title } from '../title/Title'

export const CarruselSkeleton = () => {
  return (
    <section className="mb-8">
        <Title title={"Peliculas en Tendencia"} size="2xl" />
        <div className="h-110 w-full animate-pulse rounded-lg bg" />
      </section>
  )
}
