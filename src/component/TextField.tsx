/* eslint-disable prettier/prettier */

import React from 'react';
import { Dimensions, Image, ImageSourcePropType, ImageStyle, Pressable, StyleProp, StyleSheet, Text, TextInput, TextProps, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import { Colors, EYE, EYE_DISABLE, fontFamily } from '../../assets';

type Props = {
    imageIconLeft: ImageSourcePropType;
    label: string;
    viewStyle?: StyleProp<ViewStyle>;
    iconRightStyle?: StyleProp<ImageStyle>;
    iconLeftStyle?: StyleProp<ImageStyle>;
    onPress?: () => void;
    onPressRight?: () => void;
    value: string;
    onChangeText?: (value: string) => void;
    hidePassword?: boolean;
}

const _TextField: React.FC<Props> = (props) => {
  
    const { imageIconLeft, value, hidePassword,label, onChangeText, onPress, onPressRight } = props;

    return (
        <Pressable onPress={onPress} style={StyleSheet.flatten([_styles.container, props.viewStyle])}>
            <View style={_styles.row}>
                <Image source={imageIconLeft} style={StyleSheet.flatten([_styles.iconLeft, props.iconLeftStyle])} />
                <TextInput secureTextEntry={hidePassword} placeholder={label} value={value} style={[_styles.input, { fontFamily: value.length == 0 ? fontFamily.Regular : fontFamily.Bold, color: value.length == 0 ? Colors.GRAY : Colors.BLACK, fontSize: value.length == 0 ? 12 : 14 }]} onChangeText={onChangeText} ></TextInput>
            </View>
            <Pressable onPress={onPressRight} >
                <Image source={hidePassword? EYE: EYE_DISABLE} style={StyleSheet.flatten([_styles.iconRight, props.iconRightStyle])} />
            </Pressable>
        </Pressable>
    )

}


const _styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 20,
        marginTop: 23
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        lineHeight: 25,
        width: Dimensions.get('window').width * 0.4
    },
    iconLeft: {
        width: 22,
        height: 22,
        marginRight: 10,
        opacity: 1
    },
    iconRight: {
        width: 20,
        height: 20,
        marginLeft: 10,
        opacity: 1
    }
});

export const TextField = React.memo(_TextField);