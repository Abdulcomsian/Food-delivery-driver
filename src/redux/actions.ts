import ActionTypes from './types';
import APIs from '@utils/APIs';
import Geolocation from 'react-native-geolocation-service';
import {getLocation, putLocationListener} from '@utils/libs';
//=======App Loading Actions
const setLoader = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.FETCHING_LOADING, payload});
};
const letsEnableLocation = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.LOC_ENABLING});
};
//======User Actions
const userAuthenticate = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.USER_AUTHORIZE, payload});
};
const userHydrid = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.HYDRID, payload});
};
const userToggleOnlineStatus =
  (STATUS: boolean = false) =>
  (dispatch: Function) => {
    // Geolocation.stopObserving();
    if (STATUS) {
      // getLocation(pos => {
      //   if (pos) {
      //     console.log('POS', pos.coords);
      //     const {longitude, latitude} = pos.coords;
      //APIs.toggleOff_OnLine(STATUS, latitude, longitude);
      dispatch({type: ActionTypes.TOGGLE_ONLINE_STATUS});
      // putLocationListener(({latitude: lat, longitude: lng}) => {
      //   APIs.toggleOff_OnLine(STATUS, lat, lng);
      // });
      //   }
      // });
    } else {
      //APIs.toggleOff_OnLine(STATUS);
      dispatch({type: ActionTypes.TOGGLE_ONLINE_STATUS});
    }
  };
const userLogout = () => (dispatch: Function) => {
  APIs.toggleOff_OnLine(false).finally(() => {
    dispatch({type: ActionTypes.USER_LOGOUT});
  });
};
//=======Orders Actions
const incomingOrder = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.INCOMING_ORDER, payload});
};
const resetIncomingOrder = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.INCOMING_ORDER_REMOVE});
};
const addToPending = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.PENDING_ORDER_ADD});
};
const addPendingToInProgress = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.PENDING_ORDER_TO_INPROGRESS});
};
const setAsInProgress = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.SET_AS_INPROGESS});
};
const orderCompleted = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.SET_AS_COMPLETED});
};
const setOrderOrigin = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.SET_ORDER_ORIGIN, payload});
};
const updateLocation = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.LOC_UPDATE, payload});
};
const setStatus = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.STATUS_UPDATE, payload});
};
//=====Exporter
export default {
  setLoader,
  setStatus,
  userAuthenticate,
  userToggleOnlineStatus,
  userLogout,
  incomingOrder,
  resetIncomingOrder,
  addToPending,
  setAsInProgress,
  orderCompleted,
  addPendingToInProgress,
  letsEnableLocation,
  setOrderOrigin,
  userHydrid,
  updateLocation,
};
