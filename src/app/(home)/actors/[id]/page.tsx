import { ActorDetailClient } from "./ActorDetailClient";
import { ActorTopMoviesClient } from "./ActorTopMoviesClient";

type PageProps = { params: { id: string } };

export default async function ActorPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <ActorDetailClient id={id} />
      <ActorTopMoviesClient id={id} />
    </>
  );
}