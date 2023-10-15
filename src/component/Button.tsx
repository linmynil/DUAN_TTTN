
import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { Colors, fontFamily } from '../../assets';

type Props = {
  title: string;
  viewStyle?: StyleProp<ViewStyle>;
  status?:boolean;
  onPress?: () => void;
};

const _Button: React.FC<Props> = props => {
  const {title, onPress,status} = props;
  return status? (
    <Pressable
      onPress={onPress}
      style={StyleSheet.flatten([_styles.buttondone, props.viewStyle])}>
      <Text style={_styles.titledone}>
        {title}
      </Text>
    </Pressable>
  ):(
    <Pressable
      onPress={onPress}
      style={StyleSheet.flatten([_styles.button, props.viewStyle])}>
      <Text style={_styles.title}>
        {title}
      </Text>
    </Pressable>
  )
};

const _styles = StyleSheet.create({
  buttondone: {
    width: Dimensions.get('window').width * 1,
    height: 48,
    backgroundColor: Colors.YELLOW,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    alignSelf: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 1,
    height: 48,
    borderColor: Colors.YELLOW,
    borderWidth:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  titledone: {
    color: Colors.WHITE,
    fontFamily: fontFamily.Bold,
    fontSize: 16,
  },
  title: {
    color: Colors.YELLOW,
    fontFamily: fontFamily.Bold,
    fontSize: 16,
  },
});

export const Button = React.memo(_Button);
