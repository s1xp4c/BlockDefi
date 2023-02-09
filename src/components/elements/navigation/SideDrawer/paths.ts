import { ISideNav } from '../SideNav/SideNav';

// { label: 'Home', href: '/' },
const SNAV_LINKS: ISideNav[] = [
  {
    label: 'SWAP',
    href: '/swap',
    logo: 'marketplace',
  },
  {
    label: 'PRESALE',
    href: '/presale',
    logo: 'chest',
  },
  {
    label: 'VOTING',
    href: '/voting',
    logo: 'documentation',
  },
  {
    label: 'OPENAI',
    href: '/openai',
    logo: 'wizard',
  },
  {
    label: 'CHARTS',
    href: '/charts',
    children: [
      {
        label: 'ERCTEST',
        subLabel: 'Get your ERC Stuff',
        href: '/balances/erc20',
        logo: 'token',
      },
      {
        label: 'CHARTS',
        subLabel: 'Get your Charts',
        href: '/charts',
        logo: 'chest',
      },
    ],
  },
];

export default SNAV_LINKS;
