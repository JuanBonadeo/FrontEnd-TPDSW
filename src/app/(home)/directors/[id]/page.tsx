import { DirectorDetailClient } from "./DirectorDetailClient";

type PageProps = { params: { id: string}};

export default async function DirectorPage({ params }: PageProps) {
    const { id } = params;

    return (
        <>
            <DirectorDetailClient id={id} />
        </>
    );
}