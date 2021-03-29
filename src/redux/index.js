import * as roomActions from './room/roomSlice';
import * as roomTypeActions from './roomType/roomTypeSlice';
import * as roomGroupActions from './roomGroup/roomGroupSlice';
import * as buildingActions from './building/buildingSlice';
import * as bookingActions from './booking/bookingSlice';
import { fetchPatientAll } from './patient/patientSlice';
import { fetchIpAll, fetchIpAllWithPage } from './ip/ipSlice';

export {
  roomActions,
  roomTypeActions,
  roomGroupActions,
  buildingActions,
  bookingActions,
  fetchPatientAll,
  fetchIpAll,
  fetchIpAllWithPage,
};
