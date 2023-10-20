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
import { Colors, EDIT, IMAGE_LOGIN, INTERNET, MANAGER, NOTIFICATION, fontFamily } from '../../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigate/StackHome';


type PropsType = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<PropsType> = (props) => {
    const { navigation } = props;
    const [role, setRole] = useState(0);
    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
    useEffect(() => {
    // Xác định giá trị văn bản mới dựa trên điều kiện hoặc logic của bạn
        const newValue1 = role == 0  ? 'Báo cáo sự cố' : 'Sự cố cần hỗ trợ';
        setText(newValue1);
        const newValue2 = role == 0 ? 'Quản lí mượn phòng học, hội trường' : 'Tính sẵn sàng phòng học';
        setText2(newValue2);
    }, [role]); 
    const handleButton=()=>{
        if(role==0 ){
            navigation.navigate('FormReport')
        }
        else if(role==1){
            navigation.navigate('Report') 
           
        }
    }
    // Tham số thứ hai là một mảng rỗng để đảm bảo useEffect chỉ được gọi một lần khi component được tạo
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
            <View style={[styles.row, { marginTop: 45 }]}>
                <View style={styles.row}>
                    <Image style={styles.avatar} source={IMAGE_LOGIN}></Image>
                    <View>
                        <Text style={styles.text1} >Xin chào,</Text>
                        <Text style={styles.text2} >Giảng viên</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { }} >
                    <Image style={styles.icon} source={NOTIFICATION}></Image>
                </TouchableOpacity>
            </View>
            <Text style={styles.title} >Dịch vụ trực tuyến</Text>
            <TouchableOpacity onPress={handleButton} style={styles.card}>
                <Image source={EDIT}></Image>
                <Text style={styles.textcard}>{text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={[styles.card, { display: role == 0 ? 'flex' : 'none' }]}>
                <Image source={INTERNET}></Image>
                <Text style={styles.textcard} >Yêu cầu hỗ trợ CNTT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.card} >
                <Image source={MANAGER}></Image>
                <Text style={styles.textcard} >{text2}</Text>
            </TouchableOpacity>
        </SafeAreaView>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GRAY_PALE2,
        paddingHorizontal: 35
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        height: 20,
        width: 18
    },
    text1: {
        color: Colors.GRAY_TEXT,
        fontSize: 12,
        fontFamily: fontFamily.Regular
    },
    text2: {
        color: Colors.YELLOW,
        fontSize: 16,
        fontFamily: fontFamily.Regular
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        height: 86,
        borderRadius: 12,
        paddingStart: 21,
        paddingEnd: 95,
        marginBottom: 34

    },
    textcard: {
        color: Colors.BLACK,
        fontSize: 16,
        fontFamily: fontFamily.Medium,
        marginLeft: 46,
        width: Dimensions.get('window').width * 0.48
    },
    title: {
        color: Colors.BLACK,
        fontSize: 20,
        fontFamily: fontFamily.Bold,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 45
    }
});

export default Home;
