import Axios, {AxiosResponse, AxiosError} from 'axios';
//import {userModel, projectModel, targetModal, reminderModal} from '@constants/interfaces';
const baseURL = 'http://localhost:3000/';
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
    if (config.data instanceof FormData) {
      Object.assign(config.headers, config.data.getHeaders());
    }
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
//requestMethods
const signIn = ({email, password}: {password: string; email: string}) => {
  return axios
    .get('/users?email=' + email)
    .then(({data, status}: AxiosResponse) => {
      if (status === 200 && Array.isArray(data) && data.length > 0) {
        const {password: dbPassword} = data[0];
        return dbPassword === password
          ? data[0]
          : {error: 'Password not correct'};
      }
      return {error: 'Email not correct'};
    })
    .catch(() => null);
};
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
  getNotifications,
  getOrderList,
  readNotification,
  removeNotification,
};
