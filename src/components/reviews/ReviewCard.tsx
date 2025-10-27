
"use client"

import { useMemo } from 'react'
import { getAvatarUrl } from '@/app/(home)/profile/edit/EditProfileClient'
import { Review } from '@/lib/types.js'
import { Star } from 'lucide-react'
import Image from 'next/image.js'

interface Props {
    review: Review
}

export const ReviewCard = ({ review }: Props) => {
    // Format date on the client using the user's locale to avoid server/client locale mismatch
    const dateFormated = useMemo(() => {
        try {
            const locale = typeof navigator !== 'undefined' ? navigator.language : 'es-ES'
            return new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date(review.review_date))
        } catch (e) {
            // Fallback to a simple ISO date if Intl is not available
            return new Date(review.review_date).toISOString().split('T')[0]
        }
    }, [review.review_date])

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
