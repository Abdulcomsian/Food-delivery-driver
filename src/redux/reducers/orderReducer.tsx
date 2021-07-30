import ActionType from '../types';
import {
  OrdersStatesInterface,
  reducerArgument,
} from '../../constants/interfaces';
const InitialOrderState: OrdersStatesInterface = {
  currentOrder: null,
  ordersPending: [],
  ordersCompleted: [],
  incomingOrder: null,
  orderOrigin: null,
};

export default (
  state = InitialOrderState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  {type, payload}: reducerArgument,
) => {
  switch (type) {
    case ActionType.USER_LOGOUT: {
      return InitialOrderState;
    }
    case ActionType.INCOMING_ORDER_REMOVE: {
      return {...state, incomingOrder: null};
    }
    case ActionType.SET_ORDER_ORIGIN: {
      return {...state, orderOrigin: payload};
    }
    case ActionType.INCOMING_ORDER_REMOVE: {
      return {...state, incomingOrder: null};
    }
    case ActionType.INCOMING_ORDER: {
      return {...state, incomingOrder: payload};
    }
    case ActionType.PENDING_ORDER_ADD: {
      const tPendingOrder = [...state.ordersPending];
      state.incomingOrder !== null && tPendingOrder.push(state.incomingOrder);
      return {...state, incomingOrder: null, ordersPending: tPendingOrder};
    }
    case ActionType.PENDING_ORDER_REMOVE: {
      const tPendingOrder = [...state.ordersPending];
      tPendingOrder.splice(payload.index, 1);
      return {...state, ordersPending: tPendingOrder};
    }
    case ActionType.PENDING_ORDER_TO_INPROGRESS: {
      return {
        ...state,
        ordersPending: state.currentOrder ? [state.currentOrder] : [],
        currentOrder: state.ordersPending[0],
      };
    }
    case ActionType.SET_AS_INPROGESS: {
      return {...state, currentOrder: state.incomingOrder, incomingOrder: null};
    }
    case ActionType.SET_AS_COMPLETED: {
      return {...state, currentOrder: null};
    }
    default:
      return state;
  }
};
