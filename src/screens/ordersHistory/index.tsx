/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  RefreshControl,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Table, Row} from 'react-native-table-component';
import {Colors, TextFamily} from '@constants';
import {Headers} from '@components';
import APIS from '@utils/APIs';
const isCloseToBottom = (
  {bottom, top}: {top: number; bottom: number},
  {layoutMeasurement, contentOffset, contentSize},
) => {
  const paddingToBottom = 20 + (bottom + top);
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
const OrderHistoryScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const FirstTimeLoad = (refrshing: boolean = false) => {
    refrshing && (setFetching(true), setRefreshing(true));
    APIS.getOrderList({uid: 1})
      .then(r => {
        if (Array.isArray(r)) {
          setOrders(DataToRender(r));
          setIsMore(r.length === 20);
          setPage(2);
        } else if (refrshing) {
          setIsMore(false);
          setPage(1);
        }
      })
      .finally(() => {
        setFetching(false);
        refrshing && setRefreshing(false);
      });
  };
  const appendMore = () => {
    if (isMore && !fetching) {
      setFetching(true);
      APIS.getOrderList({uid: 1, page})
        .then(r => {
          if (Array.isArray(r)) {
            r.length > 0 &&
              setOrders([...orders, ...DataToRender(r, orders.length)]);
            setIsMore(r.length === 20);
            setPage(page + 1);
          }
        })
        .finally(() => {
          setFetching(false);
        });
    }
  };
  useEffect(FirstTimeLoad, []);
  const DataToRender = (arrayToBeRender: Array, lastItem: number = 0) => {
    const arrLoc = [];
    arrayToBeRender.forEach((item: object, idex: number) => {
      arrLoc.push([
        <Text
          numberOfLines={1}
          style={{
            fontFamily: TextFamily.ROBOTO_REGULAR,
            fontSize: Platform.OS === 'android' ? 15 : 14,
            textAlign: 'center',
          }}>
          {idex + 1 + lastItem}
        </Text>,
        <Text
          numberOfLines={1}
          style={{
            fontFamily: TextFamily.ROBOTO_REGULAR,
            fontSize: Platform.OS === 'android' ? 15 : 14,
            textAlign: 'center',
          }}>
          {item.name}
        </Text>,
        <Text
          numberOfLines={1}
          style={{
            fontFamily: TextFamily.ROBOTO_REGULAR,
            fontSize: Platform.OS === 'android' ? 15 : 14,
            textAlign: 'center',
          }}>
          {item.amount}
        </Text>,
        <Text
          numberOfLines={1}
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: TextFamily.ROBOTO_REGULAR,
            fontSize: Platform.OS === 'android' ? 15 : 14,
          }}>
          {item.pickedFrom}
        </Text>,
      ]);
    });
    return arrLoc;
  };
  return (
    <View style={OrderHistoryStyle.container}>
      <Headers.HeaderA title="Orders History" navigation={navigation} />
      <ScrollView horizontal>
        <View>
          <Table>
            <Row
              data={tableConstant.tableHead}
              widthArr={tableConstant.widthArr}
              style={OrderHistoryStyle.head}
              textStyle={OrderHistoryStyle.text}
            />
          </Table>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  FirstTimeLoad(true);
                }}
              />
            }
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom({bottom, top: 0}, nativeEvent)) {
                //enableSomeButton();
                console.log('In The End');
                appendMore();
              }
            }}
            scrollEventThrottle={400}
            style={OrderHistoryStyle.dataWrapper}
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: bottom,
            }}>
            <Table>
              {orders.map((itemRow, index) => (
                <Row
                  key={index}
                  data={itemRow}
                  widthArr={tableConstant.widthArr}
                  style={[
                    OrderHistoryStyle.ListItem,
                    index % 2 && {backgroundColor: Colors.Grey2},
                  ]}
                  textStyle={[{color: Colors.black}]}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const tableConstant = {
  tableHead: ['#', 'Name', 'Amount', 'Picked from'],
  widthArr: [WP(15) - 30, WP(30), WP(20), WP(50)],
};
const OrderHistoryStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  dataWrapper: {
    marginTop: -1,
  },
  flatListHeader: {
    width: '100%',
    height: 48,
    backgroundColor: '#00BCD4',
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {fontSize: 12, fontFamily: TextFamily.ROBOTO_BOLD},
  NotiDetail: {
    fontSize: Platform.OS === 'android' ? 16 : 15,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  ListItem: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    height: 40,
    width: '100%',
  },
  reactAngle: {
    width: '100%',
    height: 66,
    justifyContent: 'center',
  },
  header: {
    height: 56,
    width: WP(100) - 30,
    justifyContent: 'center',
    marginBottom: 30,
  },
  head: {
    height: 50,
    backgroundColor: Colors.Grey7,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
  },
});
export default OrderHistoryScreen;
