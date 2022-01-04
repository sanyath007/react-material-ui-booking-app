import React from 'react';
import { Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';

import DashboardView from 'src/views/reports/DashboardView';
import BookingListView from 'src/views/booking/BookingListView';
import NewBooking from 'src/views/booking/NewBooking';
import EditBooking from 'src/views/booking/EditBooking';
import BookingDetail from 'src/views/booking/BookingDetail';
import CheckinRoom from 'src/views/booking/CheckinRoom';
import CalendarView from 'src/views/calendar/CalendarView';
import RoomsStatusView from 'src/views/room/RoomsStatus';
import RoomListView from 'src/views/room/RoomListView';
import NewRoom from 'src/views/room/NewRoomView';
import EditRoom from 'src/views/room/EditRoomView';
import QueueListView from 'src/views/queue/QueueListView';
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
      { path: 'bookings', element: <BookingListView /> },
      { path: 'bookings/new', element: <NewBooking /> },
      { path: 'bookings/:bookId/edit', element: <EditBooking /> },
      { path: 'bookings/:bookId/detail', element: <BookingDetail /> },
      { path: 'checkin/:bookId', element: <CheckinRoom /> },
      { path: 'calendar', element: <CalendarView /> },
      { path: 'status', element: <RoomsStatusView /> },
      { path: 'rooms', element: <RoomListView /> },
      { path: 'rooms/new', element: <NewRoom /> },
      { path: 'rooms/edit/:roomId', element: <EditRoom /> },
      { path: 'queues', element: <QueueListView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'settings', element: <SettingsView /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '', element: <Navigate to="app/dashboard" /> },
      { path: '*', element: <Navigate to="404" /> }
    ]
  }
];

export default routes;
