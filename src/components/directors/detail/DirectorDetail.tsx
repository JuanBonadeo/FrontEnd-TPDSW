"use client"

import { Director } from "@/lib/types";

interface Props {
  director: Director;
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

export function DirectorDetail({ director }:Props) {
    const fullName = `${director.first_name} ${director.last_name}`;
    const birthLabel = formatBirthDate(director.birth_date);
    const age = calcAge(director.birth_date);

    return (
        <div>
            <h1>{fullName}</h1>
            <p>Fecha de nacimiento: {birthLabel}</p>
            <p>Edad: {age} años</p>
        </div>
    );
}
