import { Nav } from '@/widgets/Nav';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Nav />
      <div className='max-lg:pb-safe-offset-16'>{children}</div>
    </>
  );
}
