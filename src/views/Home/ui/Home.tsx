import { Counter } from '@/widgets/Counter';
import { Title } from './Title';

export default function Home() {
  return (
    <main className='h-full flex flex-col'>
      <Title />
      <Counter />
    </main>
  );
}
