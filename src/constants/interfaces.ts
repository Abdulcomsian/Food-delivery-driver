export interface reducerArgument {
  type: string;
  payload: any;
}
export interface InitialUserInterface {
  loggedIn: boolean;
  online: boolean;
  detail: object;
  achievementDetail: object;
}

export interface OrdersStatesInterface {
  currentOrder: object | null;
  orderOrigin: object | null;
  incomingOrder: object | null;
  ordersPending: Array<object>;
  ordersCompleted: Array<object>;
}
export interface AppStatesInterface {
  authLoading: boolean;
  fetchingLoading: boolean;
  locationEnabled: boolean;
}
export interface userModel {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}
