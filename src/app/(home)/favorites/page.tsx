import { Title } from '../../../components/ui/title/Title';
import { FavouritesClient } from './FavouritesClient';

export default async function FavouritesPage() {
  return (
    <div className='p-4'>
      <Title title='Favoritas' size='2xl'/>
      <FavouritesClient />
    </div>
  );
}