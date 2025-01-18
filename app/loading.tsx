import { Spinner } from '@heroui/react';

export default function Loading() {
  return (
    <Spinner
      size='lg'
      className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    />
  );
}
