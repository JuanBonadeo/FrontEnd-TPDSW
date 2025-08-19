

import { Star } from 'lucide-react'
import Image from 'next/image.js'
import React from 'react'

interface Props {
    review: {
        id: number
        user: {
            name: string
            avatar: string
            initials: string
        }
        rating: number
        date: string
        content: string
    }
}

export const ReviewCard = ({ review }: Props) => {
    return (
        <div key={review.id} className="overflow-hidden bg p-4 rounded-xl ">
            <div className="flex items-start gap-3">
                <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image height={40} width={40} className="aspect-square h-full w-full" src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">{review.user.initials}</div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">{review.user.name}</h3>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center mt-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(review.rating) ? "text-primary" : "text-muted"}`}
                                fill={i < Math.floor(review.rating) ? "red" : "none"}
                            />
                        ))}
                        <span className="ml-2 text-sm">{review.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.content}</p>
                </div>
            </div>
        </div>
    )
}
