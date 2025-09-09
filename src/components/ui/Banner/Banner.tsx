import Image from 'next/image.js'
import React from 'react'
import { Title } from '../title/Title'

export const Banner = () => {
  return (
    <div className='w-full my-10 flex flex-col items-center justify-center gap-5'>
      <h1 className='text-5xl font-bold text-center  text-primary' >Crit<span className='text-white'>io</span></h1>
      <p className='text-center'>Tu plataforma para descubrir y explorar películas.</p>
      <button className='flex items-center justify-center rounded-md py-2 min-w px-5 transition-colors cursor-pointer bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed'>
        Comenzar a explorar
        </button>
    </div>
  )
}
