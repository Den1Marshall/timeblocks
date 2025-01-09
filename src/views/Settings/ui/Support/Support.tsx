'use client';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { FC } from 'react';
import { SettingsButton } from '../SettingsButton/SettingsButton';

export const Support: FC = () => {
  const openMailClient = (): void => {
    window.location.href = 'mailto:denyshrychulevych@gmail.com';
  };

  const share = async () => {
    if (!navigator.share || !navigator.canShare) {
      alert('Your device does not support the Web Share API.'); // TODO: use nextui alert
      return;
    }

    const shareData = {
      url: window.location.origin,
      text: 'TimeBlocks description',
      title: 'TimeBlocks',
    };

    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
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
