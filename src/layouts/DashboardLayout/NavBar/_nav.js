import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Home as HomeIcon,
  Calendar as CalendarIcon,
  Sliders as SlidersIcon
} from 'react-feather';

const items = [
  {
    href: 'dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    permission: [1, 2, 3]
  },
  {
    href: 'bookings',
    icon: HomeIcon,
    title: 'ทะเบียนจองห้อง',
    permission: [1, 2, 3]
  },
  // {
  //   href: 'calendar',
  //   icon: CalendarIcon,
  //   title: 'ตารางการจองห้อง',
  //   permission: [1, 2, 3]
  // },
  {
    href: 'queues',
    icon: CalendarIcon,
    title: 'คิวห้องพิเศษ',
    permission: [1, 2, 3]
  },
  {
    href: 'status',
    icon: SlidersIcon,
    title: 'สถานะห้อง',
    permission: [1, 2, 3]
  },
  {
    href: 'rooms',
    icon: ShoppingBagIcon,
    title: 'ห้องพิเศษ',
    permission: [1, 2]
  },
  {
    href: 'account',
    icon: UserIcon,
    title: 'Account',
    permission: [1]
  },
  {
    href: 'settings',
    icon: SettingsIcon,
    title: 'Settings',
    permission: [1]
  }
];

export default items;
