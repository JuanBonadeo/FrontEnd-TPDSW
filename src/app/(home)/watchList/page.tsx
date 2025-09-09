import { WatchListClient } from "./WatchListClient";
import { Title } from "@/components/ui/title/Title";

export default async function WatchListPage() {
  return (
    <div className='p-4'>
      <Title title='Favoritas' size='2xl'/>
      <WatchListClient />
    </div>
  );
}