/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageStyle,
  ScrollView,
  ViewStyle,
  Image,
  View,
  Text,
  Modal,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import getShadow from '@utils/shadow';
import {Colors, Images, GOOGLE_MAPS_APIKEY, TextFamily} from '@constants';
import Button from './buttons';
type coordinate =
  | {
      latitude: number;
      longitude: number;
    }
  | undefined;
type allLocs =
  | {
      destination: coordinate;
      origin: coordinate;
      hotel: coordinate;
    }
  | undefined
  | null;
const LocationEnabler = () => {
  return (
    <View style={LocationEnablerStyles.container}>
      <View style={LocationEnablerStyles.card}>
        <Image
          source={Images.enableLocation}
          style={LocationEnablerStyles.locatorImage}
        />
        <Text
          style={[
            LocationEnablerStyles.commen,
            LocationEnablerStyles.mainTitle,
          ]}>
          Enable Your Location
        </Text>
        <Text
          style={[
            LocationEnablerStyles.commen,
            LocationEnablerStyles.subTitle,
          ]}>
          Please allow to use your location to show nearby restaurent on the map
        </Text>
        <Button.ButtonA
          title={'Enable Location'}
          style={LocationEnablerStyles.Btn}
        />
      </View>
    </View>
  );
};
const PasswordReset = () => {
  return (
    <View style={LocationEnablerStyles.container}>
      <View style={LocationEnablerStyles.card}>
        <Image
          source={Images.passwordReset}
          style={LocationEnablerStyles.locatorImage}
        />
        <Text
          style={[
            LocationEnablerStyles.commen,
            LocationEnablerStyles.mainTitle,
          ]}>
          Your password has been reset
        </Text>
        <Text
          style={[
            LocationEnablerStyles.commen,
            LocationEnablerStyles.subTitle,
          ]}>
          You'll shortly receive an email with a code to setup a new password.
        </Text>
        <Button.ButtonA title={'Login'} style={LocationEnablerStyles.Btn} />
      </View>
    </View>
  );
};
const StatusCard = ({status = false}: {status?: boolean}) => {
  const [showing, setShowing] = useState<boolean>(true);
  useEffect(() => {
    if (status) {
      setTimeout(() => {
        setShowing(false);
      }, 4000);
    } else {
      setShowing(true);
    }
  }, [status]);
  return showing ? (
    <View style={statusStyle.contain}>
      <View
        style={[
          statusStyle.bar,
          {backgroundColor: status ? Colors.red : Colors.green},
        ]}>
        {/* <View style={statusStyle.imageContOuter}> */}
        {/* <View style={statusStyle.imageCont}> */}
        <Image
          style={statusStyle.image}
          source={status ? Images.icBic : Images.icMoon}
        />
        {/* </View> */}
        {/* </View> */}
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            numberOfLines={1}
            style={[
              statusStyle.title,
              {color: status ? Colors.white : Colors.black},
            ]}>
            {`You are ${status ? 'on' : 'off'}line !`}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              statusStyle.subTitle,
              {color: status ? Colors.white : Colors.dark},
            ]}>
            {status
              ? 'Ready to accepting orders.'
              : 'Go online to start accepting orders.'}
          </Text>
        </View>
      </View>
    </View>
  ) : null;
};
const LimitCardModal = ({
  visible = false,
  setVisible = () => {},
}: {
  visible?: boolean;
  setVisible?: Function;
}) => {
  return (
    <Modal
      hardwareAccelerated={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
      transparent={true}>
      <View style={limitModal.contain}>
        <View style={limitModal.card}>
          <Text style={limitModal.heading}>Order Limit Reached</Text>
          <Text style={limitModal.subHeading}>
            You have reached the maximum number of queueing orders. Complete
            them before taking new ones.
          </Text>
          <Button.ButtonA
            onPress={() => setVisible(false)}
            title={'Ok'}
            style={{width: 235, backgroundColor: Colors.red2}}
            textStyle={{color: Colors.red}}
          />
        </View>
      </View>
    </Modal>
  );
};
const OrderRequestCard = ({
  style = {},
  onPress = () => {},
}: {
  style?: ViewStyle;
  onPress?: Function;
}) => {
  return (
    <View style={[orderRequestStyle.orderRequest, {...style}]}>
      <TouchableOpacity
        onPress={() => {}}
        style={orderRequestStyle.closeBtn}
        activeOpacity={0.85}>
        <Image source={Images.close} style={{width: 16, height: 16}} />
      </TouchableOpacity>
      <Text style={orderRequestStyle.title}>Order Request</Text>
      <TextWithIcon title={'John Doe'} icon={Images.user} />
      <TextWithIcon title={'+44 123 456 7890'} icon={Images.callRed} />
      <View style={orderRequestStyle.line} />
      <TextWithIcon
        title={'PickUp Location'}
        icon={Images.greenCircle}
        iconStyle={{width: 20, height: 20, marginRight: 13}}
        subtitle={'123Lorem ipsum drive,lorem ipsum'}
      />
      <TextWithIcon
        title={'Drop Location'}
        icon={Images.locationPin}
        subtitle={'123Lorem ipsum drive,lorem ipsum sada asasdas'}
      />
      <Button.ButtonA
        onPress={onPress}
        title={'Accept Order'}
        style={{backgroundColor: Colors.red, marginTop: 20}}
      />
    </View>
  );
};
const OrderDeliveredCard = ({
  style = {},
  statusSetter = () => {},
  backPress = () => {},
  currentOrder = {},
}: {
  currentOrder: any;
  style?: ViewStyle;
  statusSetter?: Function;
  backPress?: Function;
}) => {
  console.log('Ítems', currentOrder?.order.items);
  return (
    <View style={[orderRequestStyle.orderRequest, {...style}]}>
      <TouchableOpacity
        onPress={() => {}}
        style={orderRequestStyle.doneBtn}
        activeOpacity={0.85}>
        <Image source={Images.tick} style={{width: 18, height: 18}} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={backPress}
        style={orderRequestStyle.closeBtn}
        activeOpacity={0.85}>
        <Image source={Images.close} style={{width: 20, height: 20}} />
      </TouchableOpacity>
      <Text style={orderRequestStyle.title2}>Order Detail</Text>
      <View style={{maxHeight: 120}}>
        <ScrollView>
          {currentOrder?.order.items.map((item, index, arr) => {
            return (
              <View
                key={'ítem' + index}
                style={{
                  width: '100%',
                  height: 40,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{
                    width: 12,
                    height: 12,
                    alignSelf: 'center',
                  }}
                  source={Images.tick}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}>
                  <View
                    style={{
                      width: 1,
                      height: 15,
                      borderLeftColor: index === 0 ? Colors.white : Colors.red,
                      borderLeftWidth: 1,
                    }}
                  />
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      borderWidth: 3,
                      borderColor: Colors.red,
                    }}
                  />
                  <View
                    style={{
                      width: 1,
                      height: 15,
                      borderLeftColor:
                        arr.length === index + 1 ? Colors.white : Colors.red,
                      borderLeftWidth: 1,
                    }}
                  />
                </View>
                <Text
                  style={{flex: 1, alignSelf: 'center', fontSize: 16}}
                  numberOfLines={1}>
                  {item.name}
                </Text>
                <Text
                  style={{alignSelf: 'center', fontSize: 16, color: Colors.red}}
                  numberOfLines={1}>
                  {item.available}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={orderRequestStyle.line2} />
      <Text style={orderRequestStyle.title2}>Deliver To</Text>
      <TextWithIcon
        title={currentOrder?.order?.client.name}
        icon={Images.user}
        style={{paddingVertical: 5}}
      />
      <TextWithIcon
        title={'Phone Number'}
        icon={Images.callRed}
        style={{paddingVertical: 5}}
      />
      <TextWithIcon
        style={{paddingVertical: 5}}
        title={'Location'}
        icon={Images.locationPin}
        subtitle={currentOrder?.order?.address.address}
      />
      <TextWithIcon
        style={{paddingVertical: 5}}
        title={'Payment'}
        icon={Images.recipt}
        subtitle={'$ ' + currentOrder?.order?.order_price}
      />
      <Button.ButtonA
        onPress={statusSetter}
        title={'Complete Order'}
        style={{backgroundColor: Colors.red, marginTop: 20}}
      />
    </View>
  );
};
const TextWithIcon = ({
  icon = undefined,
  title = '',
  subtitle = '',
  style = {},
  iconStyle = {},
}: {
  icon: any;
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  iconStyle?: ImageStyle;
}) => {
  return (
    <View style={{width: 250, paddingVertical: 10, ...style}}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <Image
          style={{
            width: 18,
            height: 18,
            marginRight: 8,
            resizeMode: 'contain',
            ...iconStyle,
          }}
          source={icon}
        />
        <Text
          style={{
            color: subtitle !== '' ? Colors.Grey7 : Colors.black,
            fontFamily: TextFamily.ROBOTO_REGULAR,
            fontSize: 17,
          }}>
          {title}
        </Text>
      </View>
      {subtitle !== '' && (
        <Text
          style={{
            marginLeft: 33,
            fontSize: 17,
            fontFamily: TextFamily.ROBOTO_REGULAR,
            color: Colors.dark,
            marginTop: 5,
          }}
          numberOfLines={3}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};
const riderDashBoardCard = ({
  style = {},
  status = 2,
  orderStatusChanger = () => {},
  statusSetter = () => {},
  distanceData = null,
  putitAsCurr = () => {},
}: {
  orderStatusChanger?: Function;
  style?: ViewStyle;
  status?: number;
  statusSetter?: Function;
  putitAsCurr?: Function;
  distanceData?: object | null;
}) => {
  return (
    <View style={[dashBoardCardStyle.container, {...style}]}>
      {status === 2 && (
        <View style={dashBoardCardStyle.willYouTablet}>
          <TouchableOpacity
            onPress={() => {
              statusSetter(1);
            }}
            style={[
              dashBoardCardStyle.btnCommen,
              {
                backgroundColor: Colors.green,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            ]}>
            <Text style={{color: Colors.white, fontSize: 17}}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              statusSetter(3);
              //putitAsCurr
            }}
            style={[
              dashBoardCardStyle.btnCommen,
              {
                backgroundColor: Colors.red,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            ]}>
            <Text style={{color: Colors.white, fontSize: 17}}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}

      {status === 4 && (
        <Button.ButtonA
          style={{
            width: wp(70),
            alignSelf: 'center',
            backgroundColor: Colors.red,
          }}
          //-------->
          onPress={() => {
            statusSetter(5);
          }}
          title={'Arrived Destination'}
        />
      )}
      {status === 3 && (
        <Button.ButtonA
          style={{
            width: wp(70),
            alignSelf: 'center',
            backgroundColor: Colors.red,
          }}
          title={'Arrived Resturant'}
          //-------->
          onPress={() => {
            statusSetter(4);
            orderStatusChanger();
          }}
        />
      )}
      <View
        style={{
          flex: 1,
          borderRadius: 8,
          padding: 10,
          marginTop: 20,
          flexDirection: 'row',
        }}>
        {status === 2 ? (
          <Fragment>
            <Item1
              title={`${
                distanceData ? distanceData.duration.toFixed(1) : ''
              } mins`}
              desc={'Total Duration'}
              icon={Images.clock}
            />
            <Item1
              title={`${
                distanceData ? distanceData.distance.toFixed(1) : ''
              } KM`}
              desc={'Total Distance'}
              icon={Images.speedometer}
            />
            <Item1 title="$.18.00" desc={'Guranteed'} icon={Images.recipt} />
          </Fragment>
        ) : (
          <Fragment>
            <Item1
              title={`${
                distanceData ? distanceData.duration.toFixed(1) : ''
              } mins`}
              desc={'Duration Left'}
              icon={Images.clock}
            />
            <Item1
              title={`${
                distanceData ? distanceData.distance.toFixed(1) : ''
              } KM`}
              desc={'Total Distance'}
              icon={Images.speedometer}
            />
            <Item1
              title={`${
                distanceData ? distanceData.distance.toFixed(1) : ''
              } KM`}
              desc={'Remaining Distance'}
              icon={Images.speedometer}
            />
          </Fragment>
        )}
      </View>
    </View>
  );
};
const Item1 = ({
  icon = undefined,
  title = '',
  desc = '',
}: {
  icon?: any;
  title: string;
  desc: string;
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {icon !== undefined ? (
        <Image
          source={icon}
          style={{
            width: 28,
            height: 28,
            resizeMode: 'contain',
          }}
        />
      ) : (
        <View style={{width: 35, height: 35, backgroundColor: Colors.Grey4}} />
      )}
      <Text
        style={{
          fontFamily: TextFamily.ROBOTO_BOLD,
          fontSize: 17,
          textAlign: 'center',
          marginVertical: 10,
        }}>
        {title}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontFamily: TextFamily.ROBOTO_REGULAR,
          fontSize: 11,
          width: '100%',
          textAlign: 'center',
          color: Colors.Grey6,
        }}>
        {desc}
      </Text>
    </View>
  );
};
const DestinationCard = ({title = ''}: {title?: string}) => {
  return (
    <View style={desCardStyles.contain}>
      <TextWithIcon
        icon={Images.locationPin}
        title={'Deliver To'}
        subtitle={title}
        style={{width: '100%', paddingBottom: 5}}
      />
    </View>
  );
};
const AnOtherOrderRequestCard = ({
  style = {},
  onPress = () => {},
  onPress2 = () => {},
  distanceData = null,
  incomingOrder = null,
}: {
  distanceData?: any;
  incomingOrder?: any;
  style?: ViewStyle;
  onPress?: Function;
  onPress2?: Function;
}) => {
  const [timeWindow, setTimeWindow] = useState<number | string>(60);
  const timer = useRef<number | string>(60);
  const interval = useRef<any>(null);
  useEffect(() => {
    interval.current = setInterval(() => {
      if (typeof timer.current === 'number' && timer.current > 0) {
        timer.current = timer.current - 1;
        setTimeWindow(t => t - 1);
      } else if (timer.current === 'timeout') {
        onPress2();
      } else {
        timer.current = 'timeout';
        setTimeWindow('timeout');
      }
    }, 1000);
    return () => {
      Boolean(interval.current) && clearInterval(interval.current);
    };
  }, []);
  return (
    <View style={orderRequestStyle.AnotherOrderRequestCont}>
      <View style={[orderRequestStyle.orderRequest, {...style}]}>
        <View style={orderRequestStyle.timer}>
          <Text style={orderRequestStyle.timerText}>
            {typeof timeWindow === 'number' ? timeWindow : '0'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onPress2()}
          style={orderRequestStyle.closeBtn}
          activeOpacity={0.85}>
          <Image source={Images.close} style={{width: 16, height: 16}} />
        </TouchableOpacity>
        <Text style={orderRequestStyle.title}>Order Request</Text>
        <TextWithIcon
          title={incomingOrder?.order?.client.name}
          icon={Images.user}
        />
        <TextWithIcon title={'PHONE Number'} icon={Images.callRed} />
        <View style={orderRequestStyle.line} />
        <TextWithIcon
          title={'PickUp Location'}
          icon={Images.greenCircle}
          iconStyle={{width: 20, height: 20, marginRight: 13}}
          subtitle={
            incomingOrder?.order?.restorant.name +
            ', ' +
            incomingOrder?.order?.restorant.address
          }
        />
        <TextWithIcon
          title={'Drop Location'}
          icon={Images.locationPin}
          subtitle={incomingOrder?.order?.address.address}
        />
        <View style={orderRequestStyle.line} />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Item1
            title={`${
              distanceData ? distanceData.duration.toFixed(1) : 0
            } Mins`}
            desc={'Total Duration'}
            icon={Images.clock}
          />
          <Item1
            title={`${distanceData ? distanceData.distance.toFixed(1) : 0} KM`}
            desc={'Total Distance'}
            icon={Images.speedometer}
          />
          <Item1
            title={'$' + incomingOrder?.order?.order_price}
            desc={'Guranteed'}
            icon={Images.recipt}
          />
        </View>
        <Button.ButtonA
          onPress={() => {
            Boolean(interval.current) && clearInterval(interval.current);
            onPress();
          }}
          disable={timeWindow === 'timeout'}
          title={timeWindow === 'timeout' ? 'Time Out' : 'Accept Order'}
          style={{
            backgroundColor:
              timeWindow === 'timeout' ? Colors.yellow : Colors.red,
            marginTop: 20,
          }}
        />
        <Button.ButtonA
          onPress={() => onPress2()}
          title={'Decline Order'}
          style={{backgroundColor: Colors.red2, marginTop: 9}}
          textStyle={{color: Colors.red}}
        />
      </View>
    </View>
  );
};
const QueuedOrderRequestCard = ({
  style = {},
  onPress = () => {},
  onPress2 = () => {},
  distanceData = null,
  incomingOrder = null,
}: {
  distanceData?: any;
  incomingOrder?: any;
  style?: ViewStyle;
  onPress?: Function;
  onPress2?: Function;
}) => {
  const hCC = {
    destination: {latitude: 37.787, longitude: -122.4324},
    hotel: {latitude: 37.79, longitude: -122.4324},
    origin: {latitude: 37.783, longitude: -122.4324},
  };
  return (
    <View style={orderRequestStyle.AnotherOrderRequestCont}>
      {/* {hCC.destination !== undefined && (
        <MapViewDirections
          origin={hCC.origin}
          waypoints={hCC.hotel !== undefined ? [hCC.hotel] : []}
          destination={hCC.destination}
          apikey={GOOGLE_MAPS_APIKEY}
          onStart={params => {
            console.log(
              `Started routing between "${params.origin}" and "${params.destination}"`,
            );
          }}
          onReady={result => {
            const {distance, duration, ...rest} = result;
            console.log(`Distance: ${distance} km.`);
            console.log(`Duration: ${duration} min.`);
            setInfo({
              distance: distance.toFixed(2),
              duration: duration.toFixed(0),
            });
          }}
          onError={errorMessage => {
            console.log(`Error while GoogleMaping:\n`, errorMessage);
          }}
        />
      )} */}
      <View style={[orderRequestStyle.orderRequest, {...style}]}>
        <TouchableOpacity
          onPress={() => onPress2()}
          style={orderRequestStyle.closeBtn}
          activeOpacity={0.85}>
          <Image source={Images.close} style={{width: 16, height: 16}} />
        </TouchableOpacity>
        <Text style={orderRequestStyle.title}>Queued Order</Text>
        <TextWithIcon
          title={incomingOrder?.order?.client.name}
          icon={Images.user}
        />
        <TextWithIcon title={'PHONE NUmber'} icon={Images.callRed} />
        <View style={orderRequestStyle.line} />
        <TextWithIcon
          title={'PickUp Location'}
          icon={Images.greenCircle}
          iconStyle={{width: 20, height: 20, marginRight: 13}}
          subtitle={
            incomingOrder?.order?.restorant.name +
            ', ' +
            incomingOrder?.order?.restorant.address
          }
        />
        <TextWithIcon
          title={'Drop Location'}
          icon={Images.locationPin}
          subtitle={incomingOrder?.order?.address.address}
        />
        <View style={orderRequestStyle.line} />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Item1
            title={`${
              distanceData ? distanceData.duration.toFixed(1) : 0
            } mins`}
            desc={'Total Duration'}
            icon={Images.clock}
          />
          <Item1
            title={`${distanceData ? distanceData.distance.toFixed(1) : 0} KM`}
            desc={'Total Distance'}
            icon={Images.speedometer}
          />
          <Item1
            title={'$' + incomingOrder?.order?.order_price}
            desc={'Guranteed'}
            icon={Images.recipt}
          />
        </View>
        <Button.ButtonA
          onPress={onPress}
          title={'Begin Delivery'}
          style={{backgroundColor: Colors.red, marginTop: 20}}
        />
      </View>
    </View>
  );
};
const CounterCard = ({
  color = Colors.red,
  title = '',
  subTitle = '',
}: {
  color?: string;
  title?: string;
  subTitle?: string;
}) => {
  return (
    <View
      style={{
        backgroundColor: color,
        width: wp(30) - 15,
        padding: 5,
        borderRadius: 4,
      }}>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 17,
          textTransform: 'uppercase',
          fontFamily: TextFamily.ROBOTO_REGULAR,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 20,
          fontFamily: TextFamily.ROBOTO_BLACK,
          marginTop: 5,
        }}>
        {subTitle}
      </Text>
    </View>
  );
};
//-----------------------------------------------Styler
const LocationEnablerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: Colors.transparentBlack,
  },
  commen: {
    marginVertical: 15,
  },
  Btn: {marginTop: 20, backgroundColor: Colors.red},
  mainTitle: {
    color: Colors.green,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  subTitle: {fontSize: 16, lineHeight: 20, textAlign: 'center'},
  card: {
    width: wp(85),
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  locatorImage: {width: wp(30), height: wp(30), marginBottom: 15},
});
const desCardStyles = StyleSheet.create({
  contain: {
    zIndex: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    ...getShadow(3),
  },
  image: {width: 20, height: 20},
  text: {width: '100%'},
});
const statusStyle = StyleSheet.create({
  contain: {height: 60, zIndex: 3, ...getShadow(3)},
  bar: {
    width: wp(100) - 30,
    height: 64,
    position: 'absolute',
    zIndex: 5,
    left: 15,
    top: 0,
    paddingHorizontal: wp(2),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 6,
  },
  title: {fontSize: 16, width: '100%'},
  subTitle: {fontSize: 14, color: Colors.dark, width: '100%'},
  // imageContOuter: {
  //   width: 44,
  //   height: 44,
  //   borderWidth: 1,
  //   borderRadius: 22,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderStyle: 'dashed',
  // },
  // imageCont: {
  //   backgroundColor: Colors.black,
  //   width: 38,
  //   height: 38,
  //   borderRadius: 19,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  image: {
    //backgroundColor: Colors.black,
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
});
const orderRequestStyle = StyleSheet.create({
  title2: {fontSize: 18, fontWeight: 'bold'},
  AnotherOrderRequestCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 21,
    backgroundColor: Colors.black + '66',
  },
  line: {
    width: '100%',
    height: 1,
    borderColor: Colors.Grey6,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  line2: {
    width: '100%',
    height: 1,
    borderColor: Colors.Grey6,
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  orderRequest: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    zIndex: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...getShadow(3),
  },
  closeBtn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  timerText: {color: Colors.red, fontWeight: 'bold', fontSize: 17},
  timer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 5,
    top: 5,
  },
  doneBtn: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  title: {
    fontSize: 24,
    fontFamily: TextFamily.ROBOTO_BLACK,
    color: Colors.green,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
const dashBoardCardStyle = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    width: wp(100),
    zIndex: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  btnCommen: {
    borderRadius: 6,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  willYouTablet: {flexDirection: 'row', borderRadius: 8, width: '100%'},
});
const limitModal = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.transparentBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 24,
    backgroundColor: Colors.white,
    padding: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: Colors.green,
    fontFamily: TextFamily.ROBOTO_BLACK,
    fontSize: 24,
    textAlign: 'center',
  },
  subHeading: {
    color: Colors.dark,
    fontFamily: TextFamily.ROBOTO_REGULAR,
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 30,
    width: 270,
  },
});
//-----------------------------------------------Exporter
export default {
  Item1,
  AnOtherOrderRequestCard,
  LocationEnabler,
  PasswordReset,
  StatusCard,
  OrderRequestCard,
  riderDashBoardCard,
  DestinationCard,
  OrderDeliveredCard,
  LimitCardModal,
  QueuedOrderRequestCard,
  CounterCard,
};
