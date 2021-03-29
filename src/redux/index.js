import { fetchRoomAll, addRoom } from './room/roomSlice';
import { fetchRoomTypeAll } from './roomType/roomTypeSlice';
import { fetchRoomGroupAll } from './roomGroup/roomGroupSlice';
import { fetchBuildingAll } from './building/buildingSlice';
import * as bookingActions from './booking/bookingSlice';
import { fetchPatientAll } from './patient/patientSlice';
import { fetchIpAll, fetchIpAllWithPage } from './ip/ipSlice';

export {
  fetchRoomAll,
  addRoom,
  fetchRoomTypeAll,
  fetchRoomGroupAll,
  fetchBuildingAll,
  bookingActions,
  fetchPatientAll,
  fetchIpAll,
  fetchIpAllWithPage,
};
