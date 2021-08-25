/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Images, TextFamily} from '@constants';
import getShadow from '@utils/shadow';
const BadgeSize = 18;
const activeOpacity = 0.85;
const HeaderA = ({
  navigation,
  title = '',
  renderRight = true,
  renderChild1 = false,
}: {
  navigation?: any;
  title?: string;
  renderRight?: boolean;
  renderChild1?: boolean;
}) => {
  const {top} = useSafeAreaInsets();
  const isDrawerOpen = useIsDrawerOpen();
  return (
    <View
      style={[HeaderAStyle.headerCont, {height: 56 + top, paddingTop: top}]}>
      <View style={HeaderAStyle.headerSubCont}>
        <View style={HeaderAStyle.rightLeftCont}>
          <TouchableOpacity
            onPress={navigation.openDrawer}
            activeOpacity={activeOpacity}
            style={HeaderAStyle.Btn}>
            <Image
              source={isDrawerOpen ? Images.close : Images.drawerMenu}
              style={HeaderAStyle.menuIcon}
            />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={1} style={HeaderAStyle.title}>
          {title}
        </Text>
        <View style={HeaderAStyle.rightLeftCont}>
          {renderRight && (
            <Fragment>
              {renderChild1 ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate('notifications')}
                  style={HeaderAStyle.nBtn}
                  activeOpacity={activeOpacity}>
                  <Badge count={7} />
                  <Image
                    source={Images.notification}
                    style={HeaderAStyle.notification}
                  />
                </TouchableOpacity>
              ) : (
                <View style={HeaderAStyle.nBtn} />
              )}
              <TouchableOpacity
                style={HeaderAStyle.Btn}
                onPress={() => navigation.navigate('profile')}
                activeOpacity={activeOpacity}>
                <Image source={Images.avatar} style={HeaderAStyle.avatar} />
              </TouchableOpacity>
            </Fragment>
          )}
        </View>
      </View>
    </View>
  );
};
const SearchBar = () => {
  return (
    <View style={SearchBarStyle.container}>
      <View style={SearchBarStyle.searchView}>
        <TouchableOpacity style={SearchBarStyle.Btn}>
          <Image style={SearchBarStyle.icon} source={Images.search} />
        </TouchableOpacity>
        <TextInput
          style={SearchBarStyle.searchInput}
          placeholder={'Search'}
          placeholderTextColor={Colors.Grey5}
          returnKeyType="search"
          onSubmitEditing={() => {}}
        />
        <TouchableOpacity style={SearchBarStyle.Btn}>
          <Image style={SearchBarStyle.icon} source={Images.filter} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Badge = ({
  count = 0,
  style = {},
}: {
  count?: number;
  style?: ViewStyle;
}) => {
  return !isNaN(count) && count !== 0 ? (
    <View style={[HeaderAStyle.Badge, style]}>
      <Text style={HeaderAStyle.BadgeText}>{count + ''}</Text>
    </View>
  ) : null;
};
const NewRequest = ({
  showing = false,
  setShowing = () => {},
}: {
  showing?: boolean;
  setShowing?: Function;
}) =>
  showing ? (
    <View style={newOrderReqStyle.container}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image source={Images.bic} style={{width: 22, height: 22}} />
        <Text style={newOrderReqStyle.NORText}>New order request!</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setShowing(true);
        }}
        activeOpacity={0.85}
        style={{backgroundColor: Colors.white + '88', borderRadius: 6}}>
        <Text style={newOrderReqStyle.viewText}>View</Text>
      </TouchableOpacity>
    </View>
  ) : null;
const HeaderAStyle = StyleSheet.create({
  rightLeftCont: {
    flexDirection: 'row',
    width: 48 + 35,
  },
  headerCont: {
    width: wp(100),
    backgroundColor: Colors.white,
    paddingLeft: 15,
    paddingRight: 12,
    zIndex: 5,
  },
  Badge: {
    position: 'absolute',
    backgroundColor: Colors.green,
    top: 5,
    right: 2,
    zIndex: 5,
    minWidth: BadgeSize,
    minHeight: BadgeSize,
    borderRadius: BadgeSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BadgeText: {color: Colors.white, fontSize: 12},
  title: {
    fontSize: 16,
    marginRight: 3,
    width: wp(45),
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  menuIcon: {width: 20, height: 20},
  notification: {width: 23, height: 23, resizeMode: 'contain'},
  Btn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
  },
  nBtn: {
    width: 35,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {width: 48, height: 48, resizeMode: 'contain'},
  headerSubCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
const SearchBarStyle = StyleSheet.create({
  container: {
    height: 56,
    zIndex: 3,
    paddingHorizontal: 15,
    alignItems: 'center',
    ...getShadow(3),
  },
  searchView: {
    height: 48,
    width: '100%',
    borderRadius: 8,
    backgroundColor: Colors.Grey1,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    //paddingBottom: 0,
    paddingHorizontal: 2,
    fontSize: 16,
  },
  icon: {width: 22, height: 22, resizeMode: 'contain'},
});
const newOrderReqStyle = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    position: 'absolute',
    justifyContent: 'space-between',
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.green,
    paddingHorizontal: 15,
  },
  NORText: {
    color: Colors.white,
    marginLeft: 7,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 15,
  },
  viewText: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    margin: 4,
    marginHorizontal: 8,
  },
});
export default {HeaderA, SearchBar, NewRequest, Badge};
