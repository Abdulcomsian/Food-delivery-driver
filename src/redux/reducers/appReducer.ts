import ActionType from '../types';
import {reducerArgument, AppStatesInterface} from '@constants/interfaces';
const InitialAppState: AppStatesInterface = {
  authLoading: false,
  fetchingLoading: false,
  locationEnabled: false,
};

export default (state = InitialAppState, {type, payload}: reducerArgument) => {
  switch (type) {
    case ActionType.FETCHING_LOADING: {
      return {
        ...state,
        fetchingLoading: payload,
      };
    }
    case ActionType.LOC_ENABLING: {
      return {...state, locationEnabled: true};
    }
    case ActionType.USER_LOGOUT: {
      return {...state, authLoading: false, fetchingLoading: false};
    }
    default:
      return state;
  }
};
