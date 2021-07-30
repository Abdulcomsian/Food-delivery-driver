const getStatus = (code: number) => {
  let status = 'Offline';
  switch (code) {
    case 0:
      status = 'Offline';
      break;
    case -1:
      status = 'Online';
      break;
    case 1:
      status = 'Online';
      break;
    case 2:
      status = 'Drive to';
      break;
    case 3:
      status = 'Pickup Order';
      break;
    case 4:
      status = 'Deliver To';
      break;
    case 5:
      status = 'Order Delivered';
      break;
    case 6:
      status = 'Online';
      break;
    default:
      status = 'Offline';
  }
  return status;
};

export {getStatus};
