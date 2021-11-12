import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '@constants';
//import APIs from '@utils/APIs';
const OrderDetail = ({route}: {route: any}) => {
  const {bottom} = useSafeAreaInsets();
  const {order} = route?.params;
  console.log('Detail', order);
  return (
    <View style={styles.screenCont}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: bottom + 20,
        }}>
        <Text style={styles.textCom}>
          <Text style={{fontWeight: 'bold'}}>Picked From : </Text>
          {order.restorant.alias}, {order.restorant.address}
        </Text>
        <Text style={styles.textCom}>
          <Text style={{fontWeight: 'bold'}}>Delivered To : </Text>
          {order.address.address}
        </Text>
        <Text style={styles.textCom}>
          <Text style={{fontWeight: 'bold'}}>Payment method: </Text>
          {order.payment_method}
        </Text>

        <Text style={[styles.textCom, {fontSize: 25, marginVertical: 10}]}>
          <Text style={{fontWeight: 'bold'}}>Order Items </Text>
        </Text>
        {order.items.map((itm, idx) => {
          const {extras} = itm.pivot;
          const tP = itm.pivot
            ? JSON.parse(extras).reduce((pre, cur) => {
                return pre + parseFloat(cur.split('+ $')[1]);
              }, parseFloat(itm.price))
            : 0;
          return (
            <View
              key={itm.id + '_'}
              style={{
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.textCom, {fontWeight: 'bold'}]}>
                  {itm.name}{' '}
                </Text>
                <Text style={[styles.textCom]}>x{itm.available}</Text>
              </View>
              <Text
                style={[
                  styles.textCom,
                  {fontWeight: 'bold', textAlign: 'right'},
                ]}>
                $ {itm.price + '\n'}
                {JSON.parse(extras).map((im: any, idx: number) => {
                  return (
                    <Text
                      key={idx + '_'}
                      style={[
                        styles.textCom,
                        {fontWeight: 'bold', textAlign: 'right'},
                      ]}>
                      {im}
                    </Text>
                  );
                })}
                {'\n'}
                <Text style={{borderTopWidth: 1}}>$ {tP}</Text>
              </Text>
            </View>
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            marginTop: 5,
            paddingTop: 5,
          }}>
          <Text style={[styles.textCom, {fontWeight: 'bold'}]}>SubTotal :</Text>
          <Text
            style={[styles.textCom, {fontWeight: 'bold', textAlign: 'right'}]}>
            $ {order.order_price}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenCont: {flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20},
  textCom: {fontSize: 17, color: '#333', marginVertical: 2},
});

export default OrderDetail;
