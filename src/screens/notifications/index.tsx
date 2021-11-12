/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import FlatList from 'react-native-swipeable-list';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Colors} from '@constants';
import {Headers} from '@components';
import APIs from '@utils/APIs';
import {getFormatedDate} from '@utils/libs';
import Json from '../../db';
import {useSelector} from 'react-redux';
const NotificationScreen = ({navigation}: {navigation: object}) => {
  const SwipeFlat = useRef(null);
  const {bottom} = useSafeAreaInsets();
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  //-----------Methods
  const FirstTimeLoad = (refrshing: boolean = false) => {
    setNotifications(Json);
    // refrshing && (setFetching(true), setRefreshing(true));
    // APIs.getNotifications({uid: 1})
    //   .then(r => {
    //     if (Array.isArray(r)) {
    //       setNotifications(r);
    //       setIsMore(r.length === 20);
    //       setPage(2);
    //     } else if (refrshing) {
    //       setIsMore(false);
    //       setPage(1);
    //     }
    //   })
    //   .finally(() => {
    //     setFetching(false);
    //     refrshing && setRefreshing(false);
    //   });
  };
  const markAsRead = (id: number, idx: number) => {
    // const locNotifications = [...notifications];
    // locNotifications[idx].read = true;
    // setNotifications(locNotifications);
    // APIs.readNotification({id});
  };
  const onDelete = (data: object, idx: number) => {
    const {id} = data;
    const locNotifications = [...notifications];
    locNotifications.splice(idx, 1);
    setNotifications(locNotifications);
    APIs.removeNotification({id});
    SwipeFlat.current?._onClose(idx);
  };
  const appendMore = () => {
    // if (isMore && !fetching) {
    //   setFetching(true);
    //   APIs.getNotifications({uid: 1, page})
    //     .then(r => {
    //       if (Array.isArray(r)) {
    //         r.length > 0 && setNotifications([...notifications, ...r]);
    //         setIsMore(r.length === 20);
    //         setPage(page + 1);
    //       }
    //     })
    //     .finally(() => {
    //       setFetching(false);
    //     });
    // }
  };
  //-----------ViewComponent
  const QuickActions = ({item, index}: {item: object; index: number}) => {
    return (
      <View style={NotificationStyle.qaContainer}>
        <View style={NotificationStyle.button}>
          <Pressable
            onPress={() => {
              // Alert.alert(
              //   'Are you sure?',
              //   'You want to delete this customer?',
              //   [
              //     {
              //       text: 'Cancel',
              //       onPress: () => console.log('Cancel Pressed'),
              //       style: 'cancel',
              //     },
              //     {
              //       text: 'Deleted',
              //       onPress: () => onDelete(item, index),
              //       style: 'destructive',
              //     },
              //   ],
              //   {cancelable: false},
              // );
            }}>
            <Text style={NotificationStyle.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  //-----------DidMount
  useEffect(FirstTimeLoad, []);
  return (
    <View style={NotificationStyle.container}>
      <Headers.HeaderA title="Notifications" navigation={navigation} />
      <FlatList
        getItemLayout={(data: object, index: number) => ({
          length: 80 + StyleSheet.hairlineWidth,
          offset: (80 + StyleSheet.hairlineWidth) * index,
          index,
        })}
        ref={SwipeFlat}
        data={notifications}
        renderQuickActions={QuickActions}
        contentContainerStyle={{paddingBottom: bottom}}
        maxSwipeDistance={66}
        shouldBounceOnMount={false}
        keyExtractor={(it: object, id: number) => 'Notification' + id}
        renderItem={({index, item}: {index: number; item: object}) => (
          <ItemView item={item} index={index} onPress={markAsRead} />
        )}
        ListFooterComponent={() =>
          fetching && !refreshing ? (
            <ActivityIndicator style={{alignSelf: 'center'}} />
          ) : null
        }
        showsVerticalScrollIndicator={false}
        onEndReached={appendMore}
        onRefresh={() => FirstTimeLoad(true)}
        refreshing={refreshing}
        onEndReachedThreshold={0.7}
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
const ItemView = ({
  item,
  index,
  onPress = () => {},
}: {
  onPress?: Function;
  index: number;
  item: object;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onPress(item.id, index)}
      style={[
        NotificationStyle.ViewCont,
        {backgroundColor: Colors.white},
      ]}>
      
      <View style={NotificationStyle.reactAngle}>
        <Text style={NotificationStyle.NotiDetail} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={NotificationStyle.time} numberOfLines={1}>
          {getFormatedDate(item.created_at)}
        </Text>
      </View>
      {/* {item.read === false && <View style={NotificationStyle.unRead} />} */}
    </TouchableOpacity>
  );
};
const NotificationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 10,
    height: 80,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    paddingVertical: 10,
    fontWeight: 'bold',
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
    width: WP(100) - 40,
    height: 66,
    justifyContent: 'center',
    borderBottomWidth:1
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
