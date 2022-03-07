import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import roomReducer from './room';
import roomTypeReducer from './roomType';
import roomGroupReducer from './roomGroup';
import buildingReducer from './building';
import bookingReducer from './booking';
import patientReducer from './patient/patientSlice';
import ipReducer from './ip/ipSlice';
import specialistReducer from './specialist';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    room: roomReducer,
    roomType: roomTypeReducer,
    roomGroup: roomGroupReducer,
    building: buildingReducer,
    booking: bookingReducer,
    patient: patientReducer,
    ip: ipReducer,
    specialist: specialistReducer,
  }
});
