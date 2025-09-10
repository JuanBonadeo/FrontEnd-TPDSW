import { DirectorDetailClient } from "./DirectorDetailClient";
import { DirectorTopMoviesClient } from "./DirectorTopMoviesClient";

type PageProps = { 
  params: Promise<{ id: string }>;
};

export default async function DirectorPage({ params }: PageProps) {
    const { id } = await params;
    return (
        <>
            <DirectorDetailClient id={id} />
            <DirectorTopMoviesClient id={id} />
        </>
    );
}