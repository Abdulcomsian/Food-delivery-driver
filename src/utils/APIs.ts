import Axios, {AxiosResponse} from 'axios';
import {Store} from '@redux';
//import {userModel, projectModel, targetModal, reminderModal} from '@constants/interfaces';
const baseURL = 'http://food.accrualhub.com/api';
const axios = Axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const callBackFun = (title: string, error: object) => {
  console.warn(title, JSON.stringify(error));
  return Promise.reject(error);
};
//requestInterceptor
axios.interceptors.request.use(
  config => {
    // if (config.data instanceof FormData) {
    //   Object.assign(config.headers, config.data.getHeaders());
    // }
    console.log(
      config.url + '\n',
      config.data ? JSON.stringify(config.data) : '',
    );
    return config;
  },
  error => callBackFun('RequestError', error),
);
//responseInterceptor
axios.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(
      'RESPONSE: \n',
      response.data ? JSON.stringify(response.data) : '',
    );
    return response;
  },
  error => callBackFun('ResponseError', error),
);
const getCustomHeader = (multipart: boolean = false) => {
  const {
    USER: {detail, loggedIn},
  } = Store.getState();
  return {
    //timeout,
    headers: {
      Accept: 'application/json',
      'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
      Authorization: loggedIn ? `Bearer ${detail.token}` : undefined,
    },
  };
};

//-----------APIS
const signIn = (payload: {password: string; email: string}) => {
  return axios
    .post('/driver/auth/gettoken', payload, {...getCustomHeader()})
    .then(({data, status}: AxiosResponse) => {
      return status === 200 ? data : null;
    })
    .catch(() => null);
};
const toggleOff_OnLine = (
  isOnline: boolean = false,
  lat: number = 0,
  long: number = 0,
) => {
  const coords = `/${lat}/${long}`;
  return axios
    .get(
      `/driver/auth/driver${isOnline ? 'on' : 'off'}line${
        isOnline ? coords : ''
      }`,
      {
        ...getCustomHeader(),
      },
    )
    .then(({data, status}: AxiosResponse) => {
      return status === 200 ? data : null;
    })
    .catch(() => null);
};
const getDriverData = () => {
  return axios
    .get('/driver/auth/data', {...getCustomHeader()})
    .then(({data, status}: AxiosResponse) => {
      return status === 200 ? data : null;
    })
    .catch(() => null);
};
const getOrders = () => {
  return axios
    .get('/driver/orders', {...getCustomHeader()})
    .then(({data, status}: AxiosResponse) => {
      return status === 200 ? data : null;
    })
    .catch(() => null);
};
const getOrderDetail = (id: number) => {
  return axios
    .get('/driver/orders/order/' + id, {...getCustomHeader()})
    .then(({data, status}: AxiosResponse) => {
      return status === 200 ? data : null;
    })
    .catch(() => null);
};
const getEarnings = () => {
  return axios
    .get('/driver/orders/earnings', {...getCustomHeader()})
    .then(({data, status}: AxiosResponse) => {
      return status === 200 ? data : null;
    })
    .catch(() => null);
};
const orderQuest = (id: number, accept: boolean = true) => {
  return axios
    .get(`/driver/orders/${accept ? 'accept' : 'reject'}order/` + id, {
      ...getCustomHeader(),
    })
    .then(({data, status}: AxiosResponse) => {
      return status === 200 ? data : null;
    })
    .catch(() => null);
};
const orderStatus = (orderId: number, status: number) => {
  return axios
    .get('/driver/orders/updateorderstatus/' + orderId + '/' + status, {
      ...getCustomHeader(),
    })
    .then(({data, status}: AxiosResponse) => {
      return status === 200 ? data : null;
    })
    .catch(() => null);
};
const orderLocation = (orderId: number, lat: number = 0, long: number = 0) => {
  return axios
    .get(
      '/driver/orders/updateorderlocation/' + orderId + '/' + lat + '/' + long,
      {
        ...getCustomHeader(),
      },
    )
    .then(({data, status}: AxiosResponse) => {
      return status === 200 ? data : null;
    })
    .catch(() => null);
};
//----------Fake----------
const getNotifications = ({
  uid,
  page = 1,
  limit = 20,
}: {
  uid: number;
  page?: number;
  limit?: number;
}) => {
  return axios
    .get(`/notifications?uid=${uid}&_page=${page}&_limit=${limit}`)
    .then(({data, status}: AxiosResponse) => {
      return status === 200 && Array.isArray(data) && data.length > 0
        ? data
        : [];
    })
    .catch(() => []);
};
const readNotification = ({id}: {id: number}) => {
  return axios
    .patch('/notifications/' + id, {read: true})
    .then(({data, status}: AxiosResponse) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(() => null);
};
const removeNotification = ({id}: {id: number}) => {
  return axios
    .delete('/notifications/' + id)
    .then(({data, status}: AxiosResponse) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(() => null);
};
const getOrderList = ({
  uid,
  page = 1,
  limit = 20,
}: {
  uid: number;
  page?: number;
  limit?: number;
}) => {
  return axios
    .get(`/orders?uid=${uid}&_page=${page}&_limit=${limit}`)
    .then(({data, status}: AxiosResponse) => {
      return status === 200 && Array.isArray(data) && data.length > 0
        ? data
        : [];
    })
    .catch(() => []);
};
export default {
  signIn,
  toggleOff_OnLine,
  getDriverData,
  orderLocation,
  orderStatus,
  orderQuest,
  getEarnings,
  getOrderDetail,
  getOrders,
  //-----------------
  getNotifications,
  getOrderList,
  readNotification,
  removeNotification,
};
