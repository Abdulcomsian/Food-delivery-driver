import React, {useState, Fragment} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {Colors, Images, TextFamily} from '../constants';
import getShadow from '../utils/shadow';
import Header from './header';
const Icon = () => <Image source={Images.bic} style={specialViewStyle.image} />;
const FloatingTopLeftBtn = ({
  queued = 0,
  setShow = () => {},
}: {
  queued?: number;
  setShow?: Function;
}) => {
  const [renderJustBtn, setRenderJustBtn] = useState(false);
  return queued > 0 ? (
    <Fragment>
      {renderJustBtn ? (
        <TouchableOpacity
          onPress={() => {
            setShow(true);
            //setRenderJustBtn(false);
          }}
          activeOpacity={0.85}
          style={specialViewStyle.circled}>
          <Header.Badge count={queued} style={{right: -6, top: 0}} />
          <Icon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setRenderJustBtn(true);
          }}
          activeOpacity={1}
          style={specialViewStyle.absoluteContain}>
          <View style={specialViewStyle.circled}>
            <Header.Badge count={queued} style={{right: -6, top: 0}} />
            <Icon />
          </View>
          <View style={specialViewStyle.talkBubble}>
            <View style={specialViewStyle.talkBubbleSquare}>
              <Text style={specialViewStyle.HeadingText} numberOfLines={1}>
                Order Queued
              </Text>
              <Text style={specialViewStyle.text} numberOfLines={2}>
                The order has been added to queue! Tap here to see queueing
                orders.
              </Text>
            </View>
            <View style={specialViewStyle.talkBubbleTriangle} />
          </View>
        </TouchableOpacity>
      )}
    </Fragment>
  ) : null;
};

const specialViewStyle = StyleSheet.create({
  text: {
    color: Colors.Grey7,
    fontSize: 15,
    fontFamily: TextFamily.ROBOTO_REGULAR,
  },
  HeadingText: {
    color: Colors.green,
    fontSize: 17,
    fontFamily: TextFamily.ROBOTO_BLACK,
  },
  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 85,
    top: 27,
  },
  talkBubbleSquare: {
    padding: 12,
    paddingTop: 20,
    width: 266,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  talkBubbleTriangle: {
    position: 'absolute',
    left: -10,
    top: 38,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderRightColor: Colors.white,
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
  },
  absoluteContain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 25,
    backgroundColor: Colors.black + '66',
  },
  image: {height: 30, width: 30},
  circled: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.green,
    top: 50,
    left: 20,
    ...getShadow(3, Colors.red),
  },
});

export default {FloatingTopLeftBtn};
