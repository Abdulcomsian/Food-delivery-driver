import {Colors} from '@constants';
import {ViewStyle} from 'react-native';
export default (
  elevation = 1,
  backgroundColor = Colors.white,
  shadowColor = Colors.black,
): ViewStyle => {
  const shadow = {
    backgroundColor,
    elevation,
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  };
  switch (elevation) {
    case 0:
      shadow.shadowOpacity = elevation;
      shadow.shadowRadius = elevation;
      shadow.shadowOffset = {
        width: elevation,
        height: elevation,
      };
      break;
    case 2:
      shadow.shadowOpacity = 0.2;
      shadow.shadowRadius = 1.41;
      break;
    case 3:
      shadow.shadowOpacity = 0.22;
      shadow.shadowRadius = 2.22;
      break;
    case 4:
      shadow.shadowOffset.height = 2;
      shadow.shadowOpacity = 0.23;
      shadow.shadowRadius = 2.62;
      break;
    case 5:
      shadow.shadowOffset.height = 2;
      shadow.shadowOpacity = 0.25;
      shadow.shadowRadius = 3.84;
      break;
    case 6:
      shadow.shadowOffset.height = 3;
      shadow.shadowOpacity = 0.27;
      shadow.shadowRadius = 4.65;
      break;
    case 7:
      shadow.shadowOffset.height = 3;
      shadow.shadowOpacity = 0.29;
      shadow.shadowRadius = 4.65;
      break;
    case 8:
      shadow.shadowOffset.height = 4;
      shadow.shadowOpacity = 0.3;
      shadow.shadowRadius = 4.65;
      break;
    case 9:
      shadow.shadowOffset.height = 4;
      shadow.shadowOpacity = 0.32;
      shadow.shadowRadius = 5.46;
      break;
    case 10:
      shadow.shadowOffset.height = 5;
      shadow.shadowOpacity = 0.34;
      shadow.shadowRadius = 6.27;
      break;
    case 11:
      shadow.shadowOffset.height = 5;
      shadow.shadowOpacity = 0.36;
      shadow.shadowRadius = 6.68;
      break;
    case 12:
      shadow.shadowOffset.height = 6;
      shadow.shadowOpacity = 0.37;
      shadow.shadowRadius = 7.49;
      break;
    case 13:
      shadow.shadowOffset.height = 6;
      shadow.shadowOpacity = 0.39;
      shadow.shadowRadius = 8.3;
      break;
    case 14:
      shadow.shadowOffset.height = 7;
      shadow.shadowOpacity = 0.41;
      shadow.shadowRadius = 9.11;
      break;
    case 15:
      shadow.shadowOffset.height = 7;
      shadow.shadowOpacity = 0.43;
      shadow.shadowRadius = 9.51;
      break;
    case 16:
      shadow.shadowOffset.height = 8;
      shadow.shadowOpacity = 0.44;
      shadow.shadowRadius = 10.32;
      break;
    case 17:
      shadow.shadowOffset.height = 8;
      shadow.shadowOpacity = 0.46;
      shadow.shadowRadius = 11.14;
      break;
    case 18:
      shadow.shadowOffset.height = 9;
      shadow.shadowOpacity = 0.48;
      shadow.shadowRadius = 11.95;
      break;
    case 19:
      shadow.shadowOffset.height = 9;
      shadow.shadowOpacity = 0.5;
      shadow.shadowRadius = 12.35;
      break;
    case 20:
      shadow.shadowOffset.height = 10;
      shadow.shadowOpacity = 0.51;
      shadow.shadowRadius = 13.16;
      break;
    case 21:
      shadow.shadowOffset.height = 10;
      shadow.shadowOpacity = 0.53;
      shadow.shadowRadius = 13.97;
      break;
    case 22:
      shadow.shadowOffset.height = 11;
      shadow.shadowOpacity = 0.55;
      shadow.shadowRadius = 14.78;
      break;
    case 23:
      shadow.shadowOffset.height = 11;
      shadow.shadowOpacity = 0.57;
      shadow.shadowRadius = 15.19;
      break;
    case 24:
      shadow.shadowOffset.height = 12;
      shadow.shadowOpacity = 0.58;
      shadow.shadowRadius = 16.0;
      break;
    default:
      shadow.shadowOpacity = 0.18;
      shadow.shadowRadius = 1.0;
  }
  return shadow;
};
