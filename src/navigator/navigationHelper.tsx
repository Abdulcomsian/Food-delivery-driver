import * as React from 'react';

const navigationRef = React.createRef();

const navigate = (name: string) => {
  navigationRef.current?.navigate(name);
};
const navigateWithParams = (name: string, params: object) => {
  navigationRef.current?.navigate(name, params);
};
export {navigate, navigationRef, navigateWithParams};
