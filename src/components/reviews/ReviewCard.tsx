


import { getAvatarUrl } from '@/app/(home)/profile/edit/EditProfileClient'
import { Review } from '@/lib/types.js'
import { Star } from 'lucide-react'
import Image from 'next/image.js'
import React from 'react'

interface Props {
    review: Review
}

export const ReviewCard = ({ review }: Props) => {
    const dateFormated = new Date(review.review_date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    return (
        <div key={review.id_review} className="overflow-hidden bg p-4 rounded-xl ">
            <div className="flex items-start gap-3">
                <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image height={40} width={40} className="aspect-square h-full w-full" src={getAvatarUrl(review.User?.image)} alt={review.User?.name} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">{review.User?.name}</h3>
                        <span className="text-xs text-muted-foreground">{dateFormated}</span>
                    </div>
                    <div className="flex items-center mt-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(review.score) ? "text-primary" : "text-muted"}`}
                                fill={i < Math.floor(3.5) ? "red" : "none"}
                            />
                        ))}
                        <span className="ml-2 text-sm">{review.score}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
            </div>
        </div>
    )
}
