import * as React from 'react';

const navigationRef = React.createRef();

const navigate = (name: string) => {
  navigationRef.current?.navigate(name);
};
const navigateWithParams = (name: string, params: object) => {
  navigationRef.current?.navigate(name, params);
};
const helperNavigate = (name: string, params: any = undefined) => {
  if (navigationRef.current) {
    params
      ? navigationRef.current?.navigate(name, params)
      : navigationRef.current?.navigate(name);
  }
};
export {navigate, navigationRef, navigateWithParams, helperNavigate};
