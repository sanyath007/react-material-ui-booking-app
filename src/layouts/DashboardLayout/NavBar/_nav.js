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
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    permission: [1, 2, 3]
  },
  {
    href: '/app/bookings',
    icon: HomeIcon,
    title: 'ทะเบียนจองห้อง',
    permission: [1, 2, 3]
  },
  // {
  //   href: '/app/calendar',
  //   icon: CalendarIcon,
  //   title: 'ตารางการจองห้อง',
  //   permission: [1, 2, 3]
  // },
  {
    href: '/app/queues',
    icon: CalendarIcon,
    title: 'คิวห้องพิเศษ',
    permission: [1, 2, 3]
  },
  {
    href: '/app/status',
    icon: SlidersIcon,
    title: 'สถานะห้อง',
    permission: [1, 2, 3]
  },
  {
    href: '/app/rooms',
    icon: ShoppingBagIcon,
    title: 'ห้องพิเศษ',
    permission: [1, 2]
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
    permission: [1]
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
    permission: [1]
  }
];

export default items;
