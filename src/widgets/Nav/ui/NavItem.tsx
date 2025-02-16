'use client';

import { Link as HeroUiLink, NavbarItem } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, ReactNode, useMemo } from 'react';

interface NavItemProps extends PropsWithChildren {
  href: string;
  icon: ReactNode;
}

export const NavItem: FC<NavItemProps> = ({ children, href, icon }) => {
  const pathname = usePathname();

  const isActive = useMemo(() => pathname === href, [pathname, href]);

  return (
    <NavbarItem isActive={isActive} className='w-full flex justify-center'>
      <HeroUiLink
        as={Link}
        href={href}
        color={isActive ? 'primary' : 'foreground'}
        showAnchorIcon
        anchorIcon={icon}
        className='flex-col-reverse'
      >
        {children}
      </HeroUiLink>
    </NavbarItem>
  );
};
