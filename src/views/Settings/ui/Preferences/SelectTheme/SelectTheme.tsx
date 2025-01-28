'use client';
import { FC } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { useTheme } from 'next-themes';
import { SystemIcon } from './icons/SystemIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { useIsClient } from 'usehooks-ts';

export const SelectTheme: FC = () => {
  const { themes, theme, setTheme } = useTheme();
  const isClient = useIsClient();

  const themeIcon =
    theme === 'system' ? (
      <SystemIcon />
    ) : theme === 'light' ? (
      <SunIcon />
    ) : (
      <MoonIcon />
    );

  if (!isClient) return null;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button startContent={themeIcon} className='capitalize'>
          {theme}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label='Select theme'
        selectionMode='single'
        closeOnSelect={false}
        selectedKeys={[theme ?? 'system']}
        onAction={(newTheme) => setTheme(newTheme as string)}
      >
        {themes.map((theme) => (
          <DropdownItem
            key={theme}
            startContent={
              theme === 'system' ? (
                <SystemIcon />
              ) : theme === 'light' ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )
            }
            className='capitalize'
          >
            {theme}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
