import { ActorDetailClient } from "./ActorDetailClient";
import { ActorTopMoviesClient } from "./ActorTopMoviesClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ActorPage({ params }: PageProps) {
  const { id } = await params;
  if (!id) {
    return <div>Invalid actor ID</div>;
  }
  return (
    <>
      <ActorDetailClient id={id} />
      <ActorTopMoviesClient id={id} />
    </>
  );
}
