'use client';

import { Alert, AlertProps } from '@heroui/react';
import {
  ExternalToast as SonnerExternalToast,
  toast as sonnerToast,
} from 'sonner';

interface ToastProps extends Pick<AlertProps, 'color'> {
  id: string | number;
  title: string;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
}

export const toast = (
  toast: Omit<ToastProps, 'id'>,
  data?: SonnerExternalToast
) =>
  sonnerToast.custom(
    (id) => (
      <Alert
        variant='solid'
        id={id.toString()}
        hideIconWrapper
        isClosable
        {...toast}
      />
    ),
    data
  );
