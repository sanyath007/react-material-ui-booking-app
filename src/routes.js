import React from 'react';
import { Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';

import DashboardView from 'src/views/reports/DashboardView';
import BookingListView from 'src/views/booking/BookingListView';
import RoomListView from 'src/views/room/RoomListView';
import NewRoom from 'src/views/room/NewRoom';
import AccountView from 'src/views/account/AccountView';
import SettingsView from 'src/views/settings/SettingsView';
import LoginView from 'src/views/auth/LoginView';
import RegisterView from 'src/views/auth/RegisterView';
import NotFoundView from 'src/views/errors/NotFoundView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'rooms', element: <RoomListView /> },
      { path: 'newroom', element: <NewRoom /> },
      { path: 'bookings', element: <BookingListView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
