'use client';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { FC } from 'react';
import { SettingsButton } from '../SettingsButton/SettingsButton';
import { toast } from '@/shared/ui';

export const Support: FC = () => {
  const openMailClient = (): void => {
    window.location.href = 'mailto:denyshrychulevych@gmail.com';
  };

  const share = async () => {
    if (!navigator.share || !navigator.canShare) {
      toast({
        title: 'Your device does not support the Web Share API.',
        color: 'warning',
      });

      return;
    }

    const shareData = {
      url: window.location.origin,
      text: 'TimeBlocks description',
      title: 'TimeBlocks',
    };

    try {
      await navigator.share(shareData);
    } catch {}
  };

  return (
    <Card as={'article'}>
      <CardHeader>
        <h2>Support</h2>
      </CardHeader>

      <CardBody className='items-start gap-2.5'>
        <SettingsButton onPress={share}>Share</SettingsButton>

        <SettingsButton onPress={openMailClient}>
          Contact support
        </SettingsButton>
      </CardBody>
    </Card>
  );
};
