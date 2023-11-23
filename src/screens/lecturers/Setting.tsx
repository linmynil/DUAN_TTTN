/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import {
    Pressable,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BELL, CALL, CALL_CLICK, CHANGE, Colors, ELLIPSE, GRADUTION, HOME_CLICK, LOGOUT, NOTIFICATION, TOGGLE_NOTIFICATION, fontFamily } from '../../../assets';
import { AppContext } from '../../context/AppCotext';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../context/AppNavigator';
type Props = BottomTabScreenProps<TabParamList, 'Setting'>;

const Setting: React.FC<Props> = (props ) => {
     const {navigation} = props;

    const appContext = useContext(AppContext);

    if (!appContext) {
        // Xử lý khi không có giá trị trong AppContext
        return null;
    }

    const { isLogin, setisLogin } = appContext;
    const { infoUser, setinfoUser } = appContext;
    const name_user = infoUser.name as string;
    const email =infoUser.email as string;
    const phoneNumber =infoUser.phoneNumber  as string;
    const avatar =infoUser.avatar  as string;


    const handleLogout = () =>{
        navigation.navigate('Home');
        setisLogin(false);    
    }
    //dropdown pick
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
            <View style={[styles.row, { justifyContent: 'space-between', marginTop: 30 }]}>
                <View style={styles.row}>
                    <Image style={styles.avatar} source={{uri:avatar}}></Image>
                    <View>
                        <Text style={styles.text1} >{name_user}</Text>
                        <Text style={styles.text2} >{email}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { }} >
                    <Image style={styles.icon} source={CALL_CLICK}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <Text style={styles.text1} >Thông tin</Text>
                <View style={styles.row} >
                    <Image style={[styles.icon, { width: 24, height: 24, marginRight: 30 }]} source={CALL}></Image>
                    <Text style={styles.text2} >{phoneNumber}</Text>
                </View>
                <View style={styles.row} >
                    <Image style={[styles.icon, { width: 24, height: 24, marginRight: 30 }]} source={HOME_CLICK}></Image>
                    <Text style={styles.text2} >Cao đẳng FPT Polytechnic</Text>
                </View>
            </View>
            <View style={[styles.card, { height: 108, paddingBottom: 30 }]}>
                <Text style={styles.text1} >Thông báo</Text>
                <View style={[styles.row, { justifyContent: 'space-between' }]} >
                    <View style={styles.row} >
                        <Image style={[styles.icon, { width: 20, height: 24, marginRight: 30 }]} source={BELL}></Image>
                        <Text style={styles.text2} >Thông báo</Text>
                    </View>
                    <Image style={[styles.icon, { width: 55, height: 23 }]} source={TOGGLE_NOTIFICATION}></Image>
                </View>

            </View>
            <View style={[styles.card, { height: 158 }]}>
                <Text style={styles.text1} >Tài khoản</Text>
                <View style={styles.row} >
                    <Image style={[styles.icon, { width: 24, height: 24, marginRight: 30 }]} source={CHANGE}></Image>
                    <Text style={styles.text2} >Chuyển sang tài khoản khác</Text>
                </View>
                <View style={styles.row} >
                    <Pressable onPress={handleLogout}>
                        <Image style={[styles.icon, { width: 24, height: 24, marginRight: 30 }]} source={LOGOUT}></Image>
                    </Pressable>
                    <Text style={styles.text2} >Đăng xuất</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GRAY_PALE2,
        paddingHorizontal: 24,
        marginTop: 26
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.WHITE,
        resizeMode: 'contain',
        marginRight: 11
    },
    icon: {
        height: 50,
        width: 50
    },
    text1: {
        color: Colors.BLACK,
        fontSize: 16,
        fontFamily: fontFamily.Bold
    },
    text2: {
        color: Colors.GRAY_TEXT,
        fontSize: 16,
        fontFamily: fontFamily.Medium
    },
    card: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE,
        height: 155,
        borderRadius: 12,
        paddingHorizontal: 23,
        paddingBottom: 40,
        paddingTop: 20,
        marginTop: 28
    },
});

export default Setting;
