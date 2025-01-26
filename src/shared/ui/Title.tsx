import { FC, PropsWithChildren } from 'react';

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className='mb-10 text-3xl font-bold'>{children}</h1>;
};
