import React from 'react'

interface Props {
    title: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    align?: "left" | "center" | "right";
}
export const Title = ({ title, align = "left", size = "xl" }: Props) => {
  return (
    <h2 className={`text-${size} font-bold text-${align} pb-3`}>{title}</h2>
  )
}
