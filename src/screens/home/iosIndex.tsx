/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import getShadow from '@utils/shadow';
import {navigationRef} from '@navigatorHelper';
import {
  Headers,
  Cards,
  Stepper,
  GoogleMap,
  BottomSheet,
  Special,
} from '@components';
import {Colors} from '@constants';
import {
  InitialUserInterface,
  OrdersStatesInterface,
  AppStatesInterface,
} from '@constants/interfaces';
import {getStatus} from '@utils/libs';
import ACTIONS from '@redux/actions';

const HomeScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {bottom} = useSafeAreaInsets();
  const [status, setStatus] = useState<number>(0);
  const [distanceData, setDistanceData] = useState(null);
  const [limitReached, setLimitReached] = useState(false);
  const [showQueued, setShowQueued] = useState(false);
  const [viewNewOrder, setViewNewOrder] = useState(false);
  const [current, setCurrent] = useState({latitude: 0, longitude: 0});
  const dispatch = useDispatch();
  const {
    detail,
    online,
    ordersPending,
    currentOrder,
    incomingOrder,
    locationEnabled,
  } = useSelector(
    ({
      USER,
      ORDERS,
      APP,
    }: {
      USER: InitialUserInterface;
      ORDERS: OrdersStatesInterface;
      APP: AppStatesInterface;
    }) => ({...USER, ...ORDERS, ...APP}),
  );
  useEffect(() => {
    setStatus(online ? 1 : 0);
  }, [online]);
  console.log('Location', current);
  return (
    <View style={style.screenCont}>
      <Headers.HeaderA
        navigation={navigation}
        title={getStatus(status)}
        renderRight={status !== 0}
        renderChild1={true}
      />

      {status < 2 && <Cards.StatusCard status={status === 1} />}
      {(status === 2 || status === 3) && (
        <Stepper step={status} lineTitle1="15min" lineTitle2="15min" />
      )}
      {status === 4 && (
        <Cards.DestinationCard
          title={
            'asfdasb bibi sdqd fwf fwfw fwf wfwf efwefwfwfwefwef fwefwwef wefwef'
          }
        />
      )}
      {/* {status === 5 && <Headers.SearchBar />} */}
      <View style={{flex: 1, overflow: 'scroll'}}>
        <Headers.NewRequest
          showing={
            incomingOrder !== null && !viewNewOrder && currentOrder !== null
          }
          setShowing={setViewNewOrder}
        />
        <GoogleMap
          status={status}
          setter={setDistanceData}
          myLocation={{latitude: 37.783, longitude: -122.4324}}
          locations={
            (currentOrder === null && incomingOrder !== null) ||
            (viewNewOrder && incomingOrder !== null)
              ? incomingOrder
              : showQueued
              ? ordersPending[0]
              : currentOrder !== null
              ? currentOrder
              : {
                  origin: {latitude: 37.783, longitude: -122.4324},
                }
          }
        />
        {/* {status === 1 && (
          <Cards.OrderRequestCard
            onPress={() => {
              setStatus(2);
            }}
            style={{paddingBottom: bottom ? 5 + bottom : 20}}
          />
        )} */}
        {(status === 2 || status === 3 || status === 4) && (
          <Cards.riderDashBoardCard
            distanceData={distanceData}
            status={status}
            putitAsCurr={() => {
              ACTIONS.setAsInProgress()(dispatch);
            }}
            statusSetter={setStatus}
            style={{paddingBottom: bottom ? 5 + bottom : 20}}
          />
        )}
        {status === 5 && (
          <Cards.OrderDeliveredCard
            backPress={() => {
              setStatus(4);
            }}
            style={{
              paddingBottom: bottom ? 5 + bottom : 20,
              paddingTop: 50,
              width: WP(85),
            }}
            statusSetter={() => {
              setStatus(6);
              ACTIONS.orderCompleted()(dispatch);
            }}
          />
        )}
        {(viewNewOrder === true ||
          (incomingOrder !== null && (status === 1 || status === 6))) && (
          <Cards.AnOtherOrderRequestCard
            distanceData={distanceData}
            onPress={() => {
              if (currentOrder === null) {
                setStatus(3);
                ACTIONS.setAsInProgress()(dispatch);
              } else {
                ordersPending.length === 0
                  ? ACTIONS.addToPending()(dispatch)
                  : (setLimitReached(true),
                    ACTIONS.resetIncomingOrder()(dispatch));
                setViewNewOrder(false);
              }
            }}
            onPress2={() => {
              ACTIONS.resetIncomingOrder()(dispatch);
              setViewNewOrder(false);
            }}
            style={{paddingBottom: bottom ? 5 + bottom : 20}}
          />
        )}
        {showQueued && (
          <Cards.QueuedOrderRequestCard
            distanceData={distanceData}
            onPress={() => {
              if (currentOrder) {
                Alert.alert(
                  'Are you sure?',
                  'You have 1 order still in progress. Want to swipe with it?',
                  [
                    {
                      text: 'No',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        setStatus(3);
                        ACTIONS.addPendingToInProgress()(dispatch);
                      },
                    },
                  ],
                );
              } else {
                ACTIONS.addPendingToInProgress()(dispatch);
                setStatus(3);
              }
              setShowQueued(false);
            }}
            onPress2={() => {
              setShowQueued(false);
            }}
            style={{paddingBottom: bottom ? 5 + bottom : 20}}
          />
        )}
        <Special.FloatingTopLeftBtn
          queued={ordersPending.length}
          setShow={setShowQueued}
        />
      </View>
      <Cards.LimitCardModal
        visible={limitReached}
        setVisible={setLimitReached}
      />
      <BottomSheet.BottomSheetSheetA
        status={online}
        setStatus={() => {
          if (locationEnabled && !online) {
            ACTIONS.userToggleOnlineStatus()(dispatch);
            setTimeout(props.navigation.closeDrawer, 300);
          } else {
            navigationRef.current.navigate('locationswitcher');
          }
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  screenCont: {flex: 1},
  secBar: {height: 56, zIndex: 3, ...getShadow(3)},
  avatar: {width: 48, height: 48, resizeMode: 'contain'},
  line: {
    width: '100%',
    height: 1,
    borderColor: Colors.Grey6,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  currentLocator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    zIndex: 10,
    position: 'absolute',
    right: 15,
    ...getShadow(3),
  },
});
export default HomeScreen;
