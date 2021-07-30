/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Table, Row} from 'react-native-table-component';
import {Colors, TextFamily} from '../../constants';
import {Headers} from '../../components';
import textFamily from '../../constants/textFamily';
const OrderHistoryScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const arrLoc = [];
    DemoData.forEach((item, idex) => {
      arrLoc.push([
        <Text
          numberOfLines={1}
          style={{
            fontFamily: textFamily.ROBOTO_REGULAR,
            fontSize: Platform.OS === 'android' ? 15 : 14,
            textAlign: 'center',
          }}>
          {idex + 1}
        </Text>,
        <Text
          numberOfLines={1}
          style={{
            fontFamily: textFamily.ROBOTO_REGULAR,
            fontSize: Platform.OS === 'android' ? 15 : 14,
            textAlign: 'center',
          }}>
          {item.name}
        </Text>,
        <Text
          numberOfLines={1}
          style={{
            fontFamily: textFamily.ROBOTO_REGULAR,
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
            fontFamily: textFamily.ROBOTO_REGULAR,
            fontSize: Platform.OS === 'android' ? 15 : 14,
          }}>
          {item.pickedFrom}
        </Text>,
      ]);
    });
    setOrders(arrLoc);
  }, []);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <View style={OrderHistoryStyle.container}>
      <Headers.HeaderA title="Orders History" navigation={navigation} />
      <Table>
        <Row
          data={tableConstant.tableHead}
          widthArr={tableConstant.widthArr}
          style={OrderHistoryStyle.head}
          textStyle={OrderHistoryStyle.text}
        />
      </Table>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            //enableSomeButton();
          }
        }}
        scrollEventThrottle={400}
        style={OrderHistoryStyle.dataWrapper}
        contentContainerStyle={{alignItems: 'center'}}>
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
  );
};

const ItemView = ({item, index}) => {
  return (
    <View style={OrderHistoryStyle.ListItem}>
      <View style={{flex: 0.5, justifyContent: 'center'}}>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontFamily: textFamily.ROBOTO_THIN,
            fontSize: Platform.OS === 'android' ? 16 : 15,
          }}>
          {index + 1}
        </Text>
      </View>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>{item.name}</Text>
      </View>
      <View style={{flex: 3, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>{item.amount}</Text>
      </View>
      <View style={{width: 100, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', width: '100%'}} numberOfLines={1}>
          {item.pickedFrom}
        </Text>
      </View>
    </View>
  );
};
const tableConstant = {
  tableHead: ['#', 'Name', 'Amount', 'Picked from'],
  widthArr: [WP(15) - 30, WP(30), WP(20), WP(35)],
};
const DemoData = [
  {
    name: 'Jame bond',
    amount: 445,
    pickedFrom: 'Ál Habibi jhjhs wdhgvyg wwhv wefweygv ffufu hufguyg gug',
  },
  {name: 'Jame bond 007 XXX', amount: 449, pickedFrom: 'Ál Habibi'},
  {name: 'Jame bond', amount: 25, pickedFrom: 'Ál Habibi'},
  {name: 'Jame bond', amount: 50, pickedFrom: 'Ál Habibi'},
  {name: 'Jame bond', amount: 100, pickedFrom: 'Ál Habibi'},
];
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
