import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import userReducer from './user';
import roomReducer from './room';
import roomTypeReducer from './roomType';
import roomGroupReducer from './roomGroup';
import buildingReducer from './building';
import bookingReducer from './booking';
import patientReducer from './patient';
import ipReducer from './ip';
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
