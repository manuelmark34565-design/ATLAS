type LinkNavItem = {
  type: 'link';
  href: string;
  label: string;
};

type DropdownNavItem = {
  type: 'dropdown';
  label: string;
  items: { href: string; label: string }[];
};

type NavItem = LinkNavItem | DropdownNavItem;

export const navItems: NavItem[] = [
  {
    type: 'link',
    href: '/',
    label: 'Home',
  },
  {
    type: 'link',
    label: 'Chat',
    href: '/text-generator',
  },
  {
    type: 'link',
    label: 'Pricing',
    href: '/pricing',
  },
];
