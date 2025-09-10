
import { Title } from "../ui/title/Title"
import { ReviewCard } from "./ReviewCard"
import { Review } from '@/lib/types'




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
