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

export const SelectTheme: FC = () => {
  const { themes, theme, setTheme } = useTheme();

  const themeIcon =
    theme === 'system' ? (
      <SystemIcon />
    ) : theme === 'light' ? (
      <SunIcon />
    ) : (
      <MoonIcon />
    );

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
