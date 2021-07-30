/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Actions from '../../redux/actions';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {Colors} from '../../constants';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 4;
const PhoneVerifyScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const dispatch = useDispatch();
  const {top, bottom} = useSafeAreaInsets();
  const [value, setValue] = useState<string>('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const onChangeText = (txt: string) => {
    setValue(txt);
    if (txt.length === 4) {
      Actions.userAuthenticate({name: 'Imran Noor'})(dispatch);
      //navigation.navigate('drawer');
    }
  };
  return (
    <View
      style={[
        phoneVerifyStyle.container,
        {paddingTop: top, paddingBottom: bottom},
      ]}>
      <View style={phoneVerifyStyle.header}>
        <HeaderBackButton
          onPress={navigation.goBack}
          truncatedLabel={''}
          tintColor={Colors.black}
          style={{height: 48, width: 48}}
          pressColorAndroid={Colors.transparent}
        />
      </View>
      <Text style={phoneVerifyStyle.title}>Code Verification</Text>
      <Text style={[phoneVerifyStyle.subTitle, {marginBottom: 60}]}>
        Enter your emailed code here
      </Text>
      <View style={{width: 300, alignSelf: 'center'}}>
        <CodeField
          ref={ref}
          {...props}
          caretHidden={false}
          value={value}
          onChangeText={onChangeText}
          cellCount={CELL_COUNT}
          rootStyle={phoneVerifyStyle.codeFieldRoot}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[
                phoneVerifyStyle.cellV,
                isFocused ? phoneVerifyStyle.focusCellV : {},
                symbol ? phoneVerifyStyle.cellFilledV : {},
              ]}>
              <Text
                style={phoneVerifyStyle.cell}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      <Text
        style={[
          phoneVerifyStyle.subTitle,
          {color: Colors.Grey6, marginTop: 110},
        ]}>
        Didn't you received any code?
      </Text>
      <Text style={phoneVerifyStyle.subTitle2}>Resend a new code.</Text>
    </View>
  );
};

export default PhoneVerifyScreen;

const phoneVerifyStyle = StyleSheet.create({
  container: {
    height: HP(100),
    width: WP(100),
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  header: {
    height: 56,
    width: WP(100) - 30,
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.green,
  },
  subTitle: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  subTitle2: {
    color: Colors.red,
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: Colors.red,
    width: WP(100),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  btnTitle: {
    fontSize: 17,
    color: Colors.white,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    fontSize: 30,
    color: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cellV: {
    width: 60,
    height: 60,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: Colors.Grey3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Grey3,
  },
  cellFilledV: {
    backgroundColor: Colors.red,
    width: 60,
    height: 60,
    borderRadius: 26,
  },
  focusCellV: {
    borderColor: Colors.red,
    width: 60,
    height: 60,
    borderRadius: 26,
  },
});
