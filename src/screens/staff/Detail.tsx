import React, { useState } from 'react';
import { BackHandler, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image }
    from 'react-native';
import { Header } from '../../component/Header';
import { ARROW_BACK, Colors, EDIT, ELLIPSE, HOME, HOME_CLICK, INTERNET, MANAGER, NOTIFICATION, PHONE, PHONE_CLICK, SETTING, STATUS, fontFamily } from '../../../assets'

const Detail = () => {
    return (
        <View style={styles.button2}>
            <Image style={styles.icon1} source={ARROW_BACK}  ></Image>
            <Text style={styles.test1}>Sự cố về máy chiếu hỏng</Text>
            <View>
                <Text style={styles.test}>Sự cố về máy chiếu hỏng</Text>
                <View>
                    <Image style={styles.icon} source={ELLIPSE}  ></Image>
                    <Text style={styles.test2}>Lê Văn Hiếu</Text>
                    <Text style={styles.test3}>0797151033</Text>
                    <Image style={styles.icon2} source={PHONE_CLICK}  ></Image>
                    <View>
                    <Text style={styles.test4}>Thời gian:</Text>
                    <Text style={styles.test5}>09:05am</Text>

                    <Text style={styles.test4}>Phòng:</Text>
                    <Text style={styles.test5}>T1103</Text>

                    <Text style={styles.test4}>Mô tả sự cố</Text>
                    <Text style={styles.test5}>Bóng đèn cháy, lỗi tivi,lỗi điều hòa</Text>
                </View>
                </View>
                
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.test7}>Tiếp Nhận</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button1}>
                <Image style={styles.icon4} source={HOME_CLICK}  ></Image>
             <Text style={styles.test6}>Trang chủ</Text>
             <View>
              <Image style={styles.icon5} source={STATUS}  ></Image>
             </View>
             <View>
              <Image style={styles.icon3} source={SETTING}  ></Image>
             </View>


            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    test7:{
        fontSize: 14,
        fontFamily: fontFamily.Bold,
    },
    test6:{
        fontSize: 12,
        fontFamily: fontFamily.Bold,
        height: 22,
        width: 70,
        top: 32,
        right: 270,
    },
    icon5:{
        height: 22,
        width: 60,
        top: -9,
        right: 160,
    },
    icon4:{
        
            height: 22,
            width: 23,
            top: 32,
            right: 280,
    },
    icon3:{
        height: 22,
        width: 23,
        top: -29,
        right: 40,
    },
    button1:{
        width: 700,
        height: 55,
        top:410,
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      
    },
    button: {
        width: 300,
        height: 55,
        backgroundColor: Colors.YELLOW,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        top:220,
        right:150,

      },
    test5: {
        fontFamily: fontFamily.Bold,
        fontSize: 16,
        height: 40,
        width: 190,
        top: 155,
       right:90,
    },
    test4: {
        height: 40,
        width: 120,
        top: 194,
        right: 190,
    },
    test3: {
        height: 40,
        width: 120,
        top: 224,
        right: 90,
    },
    test2: {
        height: 40,
        width: 120,
        top: 244,
        right: 90,
    },
    icon2: {
        height: 40,
        width: 40,
        top: 164,
        left: 110,
    },
    icon: {
        height: 40,
        width: 50,
        top: 283,
        right: 190,

    },
    test: {
        fontSize: 15,
        height: 22,
        width: 220,
        top: 270,
        right: 190,
    },
    button2: {
        width: 700,
        height: 55,
        top: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    test1: {
        fontSize: 18,
        fontFamily: fontFamily.Bold,
        height: 22,
        width: 220,
        top: 255,
        right: 150,
    },
    icon1: {
        height: 22,
        width: 23,
        top: 278,
        right: 320,

    },
});

export default Detail