
import { Star } from "lucide-react"
import Image from "next/image.js"
import { Title } from "../ui/title/Title"
import { ReviewCard } from "./ReviewCard"
import { Review } from '../../hooks/useReviewsByMovieId';




export function ReviewSection({ reviews }: { reviews: Review[] }) {
    return (
        <div className="rounded-lg  bg-card  shadow-sm space-y-4 pt-10">
            <Title title="Reviews"  size="2xl"/>
            <div className="space-y-3">
                {reviews.map((review) => (
                    <ReviewCard key={review.id_review} review={review} />
                ))}
            </div>
        </div>
    )
}
