import React, { useState } from 'react';
import { BackHandler, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image }
    from 'react-native';
import { Header } from '../../component/Header';
import { ARROW_BACK, ARROW_DOWN, Colors, EDIT, ELLIPSE, HOME, HOME_CLICK, INTERNET, MANAGER, NOTIFICATION, PHONE, PHONE_CLICK, SETTING, STATUS, fontFamily } from '../../../assets'

const DetailTiepNhanSuCo = () => {
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
                <View>
                <TouchableOpacity style={styles.button3} >
                    <Text style={styles.test10}>Lỗi Sự Cố</Text>
                    <Image style={styles.icon6} source={ARROW_DOWN}  ></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button4} >
                    <Text style={styles.test11}>Thời Gian</Text>
                    <Image style={styles.icon7} source={ARROW_DOWN}  ></Image>
                </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button5} >
                    <Text style={styles.test7}>Ghi chú</Text>
                </TouchableOpacity>

                
                
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.test8}>Hoàn Thành</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button6} >
                    <Text style={styles.test9}>Chưa Sử Lý</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.button1}>
            <TouchableOpacity>
                <Image style={styles.icon4} source={HOME_CLICK}  ></Image>
             <Text style={styles.test6}>Trang chủ</Text></TouchableOpacity>

             <View>
                <TouchableOpacity>
              <Image style={styles.icon5} source={STATUS}  ></Image>
              </TouchableOpacity></View>

             <View>
             <TouchableOpacity>
              <Image style={styles.icon3} source={SETTING}  ></Image>
              </TouchableOpacity>
             </View>


            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    icon7:{
        height: 9,
        width: 10,
        top: -9,
        left: 37,
    },
    icon6:{
        height: 9,
        width: 10,
        top: -9,
        left: 70,
    },
    test11:{
        fontSize: 12,
        fontFamily: fontFamily.Bold,
        right:20,
        top:3,
    },
    test10:{
        fontSize: 12,
        fontFamily: fontFamily.Bold,
        right:50,
        top:3,
    },
    test9:{
        fontSize: 14,
        fontFamily: fontFamily.Bold,
    },
    test8:{
        fontSize: 14,
        fontFamily: fontFamily.Bold,
    },
    button6: {
        width: 140,
        height: 45,
        backgroundColor: Colors.RED,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        top:235,
        left:10,

      },
    button5: {
        width: 300,
        height: 135,
        backgroundColor: Colors.DACAM,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        top:250,
        right:150,
    },
    button4:{
        width: 100,
        height: 35,
        backgroundColor: Colors.DACAM,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        top:240,
        left:50,
    },
    button3:{
        width: 180,
        height: 35,
        backgroundColor: Colors.DACAM,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        top:275,
        right:150,
    },
    test7:{
        fontSize: 14,
        
        fontFamily: fontFamily.Bold,
        top:-52,
        right:110,
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
            right: 260,
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
        top:290,
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      
    },
    button: {
        width: 140,
        height: 45,
        backgroundColor: Colors.GREEN,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        top:280,
        right:150,

      },
    test5: {
        fontFamily: fontFamily.Bold,
        fontSize: 16,
        height: 40,
        width: 190,
        top: 255,
       right:90,
    },
    test4: {
        height: 40,
        width: 120,
        top: 294,
        right: 190,
    },
    test3: {
        height: 40,
        width: 120,
        top: 344,
        right: 90,
    },
    test2: {
        height: 40,
        width: 120,
        top: 364,
        right: 90,
    },
    icon2: {
        height: 40,
        width: 40,
        top: 284,
        left: 110,
    },
    icon: {
        height: 40,
        width: 50,
        top: 403,
        right: 190,

    },
    test: {
        fontSize: 15,
        height: 22,
        width: 220,
        top: 390,
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
        top: 375,
        right: 150,
    },
    icon1: {
        height: 22,
        width: 23,
        top: 398,
        right: 320,

    },
});

export default DetailTiepNhanSuCo