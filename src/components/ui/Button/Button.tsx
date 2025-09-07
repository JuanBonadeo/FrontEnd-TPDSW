import Link from 'next/link.js';
import React from 'react'

interface Props {
    label: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    href?: string;
    action?: () => void;
    icon?: React.ReactNode;
}

export const Button = ({ label, className, size = "md", href, action, icon }: Props) => {
    return (
        <Link href={href} >
            <button className={`"flex items-center justify-center rounded-md py-2 w-${size} transition-colors cursor-pointer",
        "bg-red-600 hover:bg-red-700" ${className}`}
                onClick={action}>
                {icon}
                {label}
            </button>
        </Link>
    )
}
