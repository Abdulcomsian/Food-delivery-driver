/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Colors} from '../../constants';
import {Headers} from '../../components';
const NotificationScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [notifications, setNotifications] = useState([]);
  const {bottom} = useSafeAreaInsets();
  useEffect(() => {
    setNotifications(DemoData);
  }, []);
  return (
    <View style={NotificationStyle.container}>
      <Headers.HeaderA title="Notifications" navigation={navigation} />
      <FlatList
        contentContainerStyle={{paddingBottom: bottom}}
        data={notifications}
        keyExtractor={(it, id) => 'Notification' + id}
        renderItem={ItemView}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              width: StyleSheet.hairlineWidth,
            }}
          />
        )}
      />
    </View>
  );
};

export default NotificationScreen;

const DemoData = [{}, {}, {}, {}, {}];
const ItemView = ({item, index}) => {
  return (
    <View
      style={[
        NotificationStyle.ViewCont,
        {backgroundColor: index % 2 === 0 ? Colors.red2 : Colors.white},
      ]}>
      <View style={NotificationStyle.circle} />
      <View style={NotificationStyle.reactAngle}>
        <Text style={NotificationStyle.NotiDetail} numberOfLines={2}>
          sdas sadaf asdasf asfaf asfasfasf adasf asdasd safaf asfaf sfafas
          saasfas afas asfasf asfasf asfasf asfas asf
        </Text>
        <Text style={NotificationStyle.time} numberOfLines={1}>
          12 hours ago
        </Text>
      </View>
      {index % 2 === 0 && <View style={NotificationStyle.unRead} />}
    </View>
  );
};
const NotificationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  unRead: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.red,
  },
  circle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: Colors.dark,
  },
  time: {fontSize: 12, fontFamily: 'Roboto-Bold'},
  NotiDetail: {
    fontSize: Platform.OS === 'android' ? 16 : 15,
    fontFamily: 'Roboto-Regular',
  },
  reactAngle: {
    width: WP(100) - 106,
    height: 66,
    justifyContent: 'center',
  },
  header: {
    height: 56,
    width: WP(100) - 30,
    justifyContent: 'center',
    marginBottom: 30,
  },
  ViewCont: {
    width: '100%',
    height: 80,
    backgroundColor: Colors.red + '66',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
