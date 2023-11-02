/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CALL, CALL_CLICK, Colors, EDIT, ELLIPSE, GRADUTION, HOME, HOME_CLICK, IMAGE_LOGIN, INTERNET, MANAGER, NOTIFICATION, fontFamily } from '../../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ContactStackParamList } from '../../navigate/ContactStack';
import { Header } from '../../component/Header';



type PropsType = NativeStackScreenProps<ContactStackParamList, 'DetailContact'>;
const DetailContact: React.FC<PropsType> = (props) => {
    const { navigation,route } = props;
    const email = route.params?.email;
    const phone= route.params?.phone;
    const name = route.params?.name;
    // let id_user = route.params?.id as string;
    // let name_user = route.params?.name as string;

    // console.log(id_user)
    // const [text, setText] = useState('');
    // const [text1, setText1] = useState('');
    // const [text2, setText2] = useState('');
    // useEffect(() => {
    //     // Xác định giá trị văn bản mới dựa trên điều kiện hoặc logic của bạn
    //     const newValue = role == 0 ? 'Giảng viên' : 'Nhân viên';
    //     setText(newValue);
    //     const newValue1 = role == 0 ? 'Báo cáo sự cố' : 'Sự cố cần hỗ trợ';
    //     setText1(newValue1);
    //     const newValue2 = role == 1 ? 'Quản lí mượn phòng học, hội trường' : 'Tính sẵn sàng phòng học';
    //     setText2(newValue2);
    // }, [role]);

    // const handleButton = () => {
    //     if (role == 0) {
    //         navigation.navigate('FormReport', {id:id_user, name:name_user})

    //     }
    //     else if (role == 1) {
    //         navigation.navigate('Report',{id:id_user, name:name_user})
    //     }
    // }
    // Tham số thứ hai là một mảng rỗng để đảm bảo useEffect chỉ được gọi một lần khi component được tạo
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
            <Header
                title='Chi tiết liên hệ'
                onPress={() => navigation.goBack()} />
            <View style={[styles.row, { justifyContent: 'space-between', marginTop:30 }]}>
                <View style={styles.row}>
                    <Image style={styles.avatar} source={ELLIPSE}></Image>
                    <View>
                        <Text style={styles.text1} >{name}</Text>
                        <Text style={styles.text2} >{email}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { }} >
                    <Image style={styles.icon} source={CALL_CLICK}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <Text style={styles.text1} >Lê Minh Hiếu</Text>  
                <View style={styles.row} >
                <Image style={[styles.icon,{width:24,height:24, marginRight:10}]} source={GRADUTION}></Image>
                <Text style={styles.text2} >Nhân viên</Text>
                </View>
                <View style={styles.row} >
                <Image style={[styles.icon,{width:24,height:24, marginRight:10}]} source={CALL}></Image>
                <Text style={styles.text2} >{phone}</Text>
                </View>
                <View style={styles.row} >
                <Image style={[styles.icon,{width:24,height:24, marginRight:10}]} source={HOME_CLICK}></Image>
                <Text style={styles.text2} >Cao đẳng FPT Polytechnic</Text>
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
        justifyContent:'space-between',
        backgroundColor: Colors.WHITE,
        height: 207,
        borderRadius: 12,
        paddingHorizontal:23,
        paddingBottom:40,
        paddingTop:20,
        marginTop:28
    },
});

export default DetailContact;
