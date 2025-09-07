"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(searchParams.get("title") ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("title", value.trim());       
    } else {
      params.delete("title");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <input
      type="text"
      value={title}
      onChange={handleChange}
      placeholder="Buscar por título..."
      className="w-md rounded-md border border-input bg-transparent px-3 py-1 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    />
  );
};
