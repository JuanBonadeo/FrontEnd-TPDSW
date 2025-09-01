"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Share2 } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";
import { Actor } from "@/lib/types";

interface Props {
    actor: Actor;
}

export function formatBirthDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function calcAge(iso: string) {
    const b = new Date(iso);
    const t = new Date();
    let age = t.getFullYear() - b.getFullYear();
    const m = t.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
    return age;
}

export function ActorDetail({ actor }: Props) {
    const fullName = `${actor.first_name} ${actor.last_name}`;
    const birthLabel = formatBirthDate(actor.birth_date);
    const age = calcAge(actor.birth_date);

    return (
        <div className=" max-w-3xl mx-auto px-4 py-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="rounded-xl relative h-[380px] w-full max-w-[280px] mx-auto overflow-hidden shadow-lg">
                    <Image
                        src={getImageUrl(actor.profile_path, "w780")}
                        alt={fullName}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="space-y-4 my-auto">
                    {/* Título + meta (a la manera de MovieDetail) */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{fullName}</h1>

                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <div className="flex items-center ml-1">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    <span>{birthLabel}, {age} años</span>
                                </div>


                                <div className="flex items-center">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    <span>{actor.birth_place}</span>
                                </div>

                            </div>
                        </div>
                    </div>



                    <Link
                        href={`https://www.themoviedb.org/person/${actor.tmdb_id}`}
                        target="_blank"
                        className="flex items-center justify-center rounded-md bg-red-600 py-2 px-3 transition-colors hover:bg-red-700"
                    >
                        <Share2 className="mr-2 h-4 w-4" />
                        TMDB
                    </Link>




                </div>
            </div>
            {/* Biografía */}
            <div className="mt-10">
                <h2 className="mb-2 text-lg font-semibold">Biografía</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {actor.biography || "Sin biografía."}
                </p>
            </div>
        </div>
    );
}
