import { ISideNav } from '../SideNav/SideNav';

// { label: 'Home', href: '/' },
const SNAV_LINKS: ISideNav[] = [
  {
    label: 'SWAP',
    subLabel: 'Swap your coins here ',
    href: '/swap',
    logo: 'token',
  },
  {
    label: 'PRESALE',
    subLabel: 'See current presale stats ',
    href: '/presale',
    logo: 'comingSoon',
  },
  {
    label: 'VOTING',
    subLabel: 'Make a proposal or vote ',
    href: '/voting',
    logo: 'documentation',
  },
  {
    label: 'OPENAI',
    subLabel: 'Ask AI about your crypto ',
    href: '/openai',
    logo: 'wizard',
  },
  {
    label: 'CHARTS',
    subLabel: 'See charts and ticker here ',
    href: '/charts',
    logo: 'chest',
  },
];

export default SNAV_LINKS;
