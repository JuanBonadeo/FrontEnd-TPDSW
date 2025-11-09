
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
                            <div key={i} className="relative w-4 h-4 shrink-0">
                                {/* empty star (outline) */}
                                <Star
                                    className="w-4 h-4 text-muted"
                                    fill="none"
                                />
                                {/* colored overlay clipped to fraction */}
                                <div
                                    className="absolute left-0 top-0 h-full overflow-hidden"
                                    style={{ width: `${Math.round(Math.max(0, Math.min(1, Number(review.score) - i)) * 100)}%` }}
                                >
                                    <Star
                                        className="w-4 h-4 text-primary"
                                        fill="currentColor"
                                    />
                                </div>
                            </div>
                        ))}
                        <span className="ml-2 text-sm">{review.score}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
            </div>
        </div>
    )
}
