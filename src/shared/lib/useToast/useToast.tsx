'use client';

import { Alert, AlertProps } from '@heroui/react';
import {
  ExternalToast as SonnerExternalToast,
  toast as sonnerToast,
} from 'sonner';
import { useMediaQuery } from 'usehooks-ts';

interface ToastProps extends Pick<AlertProps, 'color'> {
  id: string | number;
  title: string;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
}

export const useToast = () => {
  const md = useMediaQuery('(width >= 48rem)');

  const toast = (
    toastProps: Omit<ToastProps, 'id'>,
    data?: SonnerExternalToast
  ) =>
    sonnerToast.custom(
      (id) => (
        <Alert
          variant='solid'
          id={id.toString()}
          hideIconWrapper
          isClosable
          {...toastProps}
        />
      ),
      {
        position: md ? undefined : 'top-center',
        ...data,
      }
    );

  return toast;
};
