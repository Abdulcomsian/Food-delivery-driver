import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

const useKeyboard = (): [number] => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardDidShow = ({
    endCoordinates: {height},
  }: KeyboardEvent): void => {
    setKeyboardHeight(height);
  };

  const onKeyboardDidHide = (): void => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const kS = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const kH = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      kS.remove();
      kH.remove();
      //Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      //Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return [keyboardHeight];
};

export default {useKeyboard};
