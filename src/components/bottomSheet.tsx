/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {StyleSheet, View, Text, Platform, Switch, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import BottomSheet from '@gorhom/bottom-sheet';
import {useSelector, useDispatch} from 'react-redux';
import {Cards} from '@components';
import {Colors, Images, TextFamily} from '@constants';
const BottomSheetSheetA = ({
  setStatus,
  status,
}: {
  status: boolean;
  setStatus: Function;
}) => {
  const {bottom} = useSafeAreaInsets();
  const {detail, loggedIn} = useSelector(({USER}) => USER);

  const FilterBottomSheet = useRef<BottomSheet>(null);
  const snapFilterBottomPoints = useMemo(() => [0, 200 + bottom], []);
  const handleFilterBottomSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    index === 0 && handleIt(false);
  }, []);
  const handleIt = (open = true) => {
    FilterBottomSheet.current?.[open ? 'expand' : 'close']();
  };
  useEffect(() => {
    handleIt(!status);
  }, [status]);
  return (
    <BottomSheet
      ref={FilterBottomSheet}
      index={status ? 0 : 1}
      handleComponent={() => (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            marginTop: 5,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image source={Images.avatar} style={style.avatar} />
              <View style={{marginLeft: 5}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {loggedIn ? detail.name : ''}
                </Text>
                <Text style={{color: Colors.Grey5, fontSize: 14}}>
                  {loggedIn ? detail.phone : ''}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  fontFamily: TextFamily.ROBOTO_BLACK,
                }}>
                Go {status ? 'off' : 'on'}line
              </Text>
              <Switch
                value={status}
                thumbColor={status ? Colors.white : Colors.dark}
                trackColor={{
                  false:
                    Platform.OS === 'android' ? Colors.Grey4 : Colors.white,
                  true: Colors.red,
                }}
                ios_backgroundColor={Colors.red2}
                onValueChange={setStatus}
              />
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View
              style={{
                width: WP(10),
                height: 4,
                backgroundColor: Colors.Grey3,
              }}
            />
          </View>
        </View>
      )}
      snapPoints={snapFilterBottomPoints}
      onChange={handleFilterBottomSheetChanges}>
      <View
        style={{
          flex: 1,
          padding: 30,
          paddingBottom: 30 + bottom,
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 8,
            backgroundColor: Colors.Grey2,
            padding: 10,
            flexDirection: 'row',
          }}>
          <Cards.Item1 title="10.2" desc={'HOURS ONLINE'} icon={Images.clock} />
          <Cards.Item1
            title="30 KM"
            desc={'TOTAL DISTANCE'}
            icon={Images.speedometer}
          />
          <Cards.Item1 title="20" desc={'TOTAL JOBS'} icon={Images.recipt} />
        </View>
      </View>
    </BottomSheet>
  );
};
const style = StyleSheet.create({
  avatar: {width: 48, height: 48, resizeMode: 'contain'},
});
export default {BottomSheetSheetA};
