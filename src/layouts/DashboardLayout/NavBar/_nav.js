import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Home as HomeIcon,
  // Calendar as CalendarIcon,
  Sliders as SlidersIcon
} from 'react-feather';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/bookings',
    icon: HomeIcon,
    title: 'จองห้องพิเศษ'
  },
  // {
  //   href: '/app/calendar',
  //   icon: CalendarIcon,
  //   title: 'ตารางการจองห้อง'
  // },
  {
    href: '/app/status',
    icon: SlidersIcon,
    title: 'สถานะการใช้ห้อง'
  },
  {
    href: '/app/rooms',
    icon: ShoppingBagIcon,
    title: 'ห้องพิเศษ'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

export default items;
