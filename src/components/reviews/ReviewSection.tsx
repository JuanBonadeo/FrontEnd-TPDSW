
import { Star } from "lucide-react"
import Image from "next/image.js"
import { Title } from "../ui/title/Title"
import { ReviewCard } from "./ReviewCard"


const reviews = [
    {
        id: 1,
        user: {
            name: "Ana García",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "AG",
        },
        rating: 5,
        date: "15 Mar 2024",
        content:
            "Una secuela espectacular que supera a la primera parte. La cinematografía es impresionante y la historia se desarrolla de manera fascinante. Villeneuve ha creado una obra maestra visual.",
    },
    {
        id: 2,
        user: {
            name: "Carlos Rodríguez",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "CR",
        },
        rating: 4,
        date: "10 Mar 2024",
        content:
            "Excelente continuación que profundiza en los personajes y expande el universo de manera coherente. Las actuaciones son sobresalientes, especialmente la de Timothée Chalamet.",
    },
    {
        id: 3,
        user: {
            name: "Laura Martínez",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "LM",
        },
        rating: 4.5,
        date: "5 Mar 2024",
        content:
            "Una película visualmente impresionante con efectos especiales de primer nivel. La trama es compleja pero bien ejecutada. Mi única crítica es que algunas partes del medio se sienten un poco lentas.",
    },
]

export function ReviewSection({ id }: { id: string | undefined }) {
    return (
        <div className="rounded-lg  bg-card  shadow-sm space-y-4 pt-10">
            <Title title="Reviews"  size="2xl"/>
            <div className="space-y-3">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    )
}
