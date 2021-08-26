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
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/g;
const passwordValidator = (password: string) => {
  return passRegex.test(password);
};
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const monthShortNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const validateEmail = (email: String) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email.replace(/\s/g, ''),
  );
};
const emailIsValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const emailToUniqueString = (email: string): string =>
  email.replace(/[^a-zA-Z0-9 ]/g, '');
const getFormatedDate = (dateToBeFormated: string, short: boolean = false) => {
  const [day, month, year] = dateToBeFormated.split('-');
  const mmonth = parseInt(month) - 1;
  const thisDay = new Date(parseInt(year), mmonth, parseInt(day));
  return short
    ? `${day} ${monthShortNames[mmonth]}, ${parseInt(year) % 100}`
    : `${weekDays[thisDay.getDay()]}, ${day} ${monthNames[mmonth]}, ${year}`;
};
export {getStatus, getFormatedDate, emailIsValid, validateEmail};
