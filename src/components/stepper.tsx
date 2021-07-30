/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Colors, Images} from '../constants';
import getShadow from '../utils/shadow';
const Stepper = ({
  step = 1,
  lineTitle1 = '',
  lineTitle2 = '',
}: {
  step: number;
  lineTitle1: string;
  lineTitle2: string;
}) => (
  <View style={statusStyle.contain}>
    <View
      style={{
        width: '100%',
        paddingHorizontal: 15,
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Step step={1} />
        <Line check={step > 2} title={lineTitle1} />
        <Step step={2} />
        <Line check={step > 3} title={lineTitle2} />
        <Step step={3} />
      </View>
    </View>
  </View>
);
const Line = ({
  check = false,
  title = '',
}: {
  check?: boolean;
  title?: string;
}) => {
  return (
    <View
      style={{
        height: 1,
        flex: 1,
        marginHorizontal: 6,
        backgroundColor: check ? Colors.green : Colors.Grey4,
      }}>
      <Text
        style={{
          position: 'absolute',
          top: -18,
          fontSize: 10,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </View>
  );
};
// const Stepx = ({step = 1}: {step?: number}) => (
//   <View style={statusStyle.imageContOuter}>
//     <View style={statusStyle.imageCont}>
//       <Image
//         style={statusStyle.image}
//         source={
//           step === 1 ? Images.bic : step === 2 ? Images.house : Images.user
//         }
//       />
//     </View>
//   </View>
// );
const Step = ({step = 1}: {step?: number}) => (
  <Image
    style={statusStyle.image}
    source={
      step === 1 ? Images.icBic : step === 2 ? Images.icHouse : Images.icUser
    }
  />
);
const statusStyle = StyleSheet.create({
  contain: {height: 64, zIndex: 3, ...getShadow(3), justifyContent: 'center'},
  imageContOuter: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  imageCont: {
    backgroundColor: Colors.black,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
});
export default Stepper;
