import React from 'react';
import { Dimensions, Image, ImageStyle, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ARROW_BACK, Colors, fontFamily } from '../../assets';

type Props = {
  title: string;
  iconStyle?: StyleProp<ImageStyle>,
  viewStyle?: StyleProp<ViewStyle>,
  onPress?: () => void;
};

const _Header: React.FC<Props> = props => {
  const { title, onPress } = props;
  return (
    <View style={StyleSheet.flatten([_styles.row, props.viewStyle])}>
      <Pressable onPress={onPress}>
        <Image source={ARROW_BACK}  style={StyleSheet.flatten([_styles.icon, props.iconStyle])}></Image>
      </Pressable>
      <Text style={_styles.text}>{title}</Text>
    </View>
  );
};

const _styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:31
  },
  icon: {
    width: 24,
    height: 24,
    opacity:1
  },
  text: {
    fontFamily: fontFamily.Bold,
    color: Colors.BLACK,
    fontSize: 20,
    lineHeight: 32,
    width: Dimensions.get('window').width * 0.80,
    textAlign: 'center'
  }
});

export const Header = React.memo(_Header);
