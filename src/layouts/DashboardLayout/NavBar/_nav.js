import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Home as HomeIcon,
  Calendar as CalendarIcon
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
  {
    href: '/app/calendar',
    icon: CalendarIcon,
    title: 'ตารางการจองห้อง'
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
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }
];

export default items;
