/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import { ARROW_DOWN, Colors, EMAIL, IMAGE_LOGIN, LOGO, PASSWORD, PHONE, PHONE_CLICK, PHONE_REGISTER, SUBTRACT, TOGGLE, TOGGLE_CLICK, USER, fontFamily } from '../../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigate/StackHome';
import { TextField } from '../../component/TextField';
import { Button } from '../../component/Button';
import { LecturesContext } from '../utilities/LecturesContext';
type Item = {
    id: string;
    title: string
};

type ItemProps = {
    item: Item;
    onPress: () => void;
};

type PropsType = NativeStackScreenProps<RootStackParamList, 'Register'>;
const Register: React.FC<PropsType> = props => {
    const { navigation } = props;
    const [selectedId, setSelectedId] = useState<string>();
    const [modalVisible, setModalVisible] = useState(false);
    const { register } = useContext(LecturesContext);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const handleOnchangePhone = (value: string) => {
        setPhoneNumber(value);
        console.log(value);
    };
    const [name, setName] = useState<string>('');
    const handleOnchangeName = (value: string) => {
        setName(value);
        console.log(value);
    };
    const [email, setEmail] = useState<string>('');
    const handleOnchangeEmail = (value: string) => {
        setEmail(value);
        console.log(value);
    };
    const [password, setPassword] = useState<string>('');
    const handleOnchangePassword = (value: string) => {
        setPassword(value);
        console.log(value);
    };

    const [hidePassword, setHidePassword] = useState(true);
    const managePasswordVisibility = () => {
        setHidePassword(!hidePassword);
        console.log(hidePassword);
    };

    //handle call api
    // const handleRegister = async () => {
    //     const res = await register(email, password, phoneNumber, name);
    //     console.log('res', res);
    //     if (res) {
    //         ToastAndroid.show('Register success', ToastAndroid.LONG);
    //         navigation.navigate('Login');
    //     } else {
    //         ToastAndroid.show('Register failed', ToastAndroid.LONG);
    //         setEmail('');
    //         setPassword('');
    //     }
    // }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
            <Image
                source={SUBTRACT}
                style={styles.backgroundImage}
            />
            <Image
                source={IMAGE_LOGIN}
                style={styles.imageLogin}
            />
            <View style={styles.content}>
                <Image
                    source={LOGO}
                    style={styles.logo}
                />
                <Text style={styles.title} >Đăng ký tài khoản</Text>
                <TextField
                    imageIconLeft={USER}
                    iconLeftStyle={{ height: 22, width: 22 }}
                    label='Tên đăng nhập'
                    iconRightStyle={{ opacity: 0 }}
                    value={name}
                    onChangeText={handleOnchangeName}
                    viewStyle={{ width: Dimensions.get('window').width * 0.86, alignSelf: 'center' }} ></TextField>
                <TextField
                    imageIconLeft={EMAIL}
                    iconLeftStyle={{ height: 20, width: 22 }}
                    label='Email'
                    iconRightStyle={{ opacity: 0 }}
                    value={email}
                    onChangeText={handleOnchangeEmail}
                    viewStyle={{ width: Dimensions.get('window').width * 0.86, alignSelf: 'center' }} ></TextField>
                <TextField
                    imageIconLeft={PASSWORD}
                    label='Mật khẩu'
                    value={password}
                    onChangeText={handleOnchangePassword}
                    hidePassword={hidePassword}
                    onPressRight={managePasswordVisibility}
                    viewStyle={{ alignSelf: 'center', width: Dimensions.get('window').width * 0.86 }} ></TextField>
                <TextField
                    imageIconLeft={PHONE_REGISTER}
                    iconLeftStyle={{ height: 22, width: 22 }}
                    label='Số điện thoại'
                    iconRightStyle={{ opacity: 0 }}
                    value={phoneNumber + ""}
                    onChangeText={handleOnchangePhone}
                    viewStyle={{ width: Dimensions.get('window').width * 0.86, alignSelf: 'center' }} ></TextField>
                <Button status={true} title='Đăng kí' onPress={() => navigation.navigate('Login')} viewStyle={{ width: Dimensions.get('window').width * 0.86, position: 'absolute', bottom: -70, zIndex: 0 }}></Button>

            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GRAY_PALE2
    },

    backgroundImage: {
        width: Dimensions.get('window').width * 1,
        height: 100,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 0,
        zIndex: -1

    },
    imageLogin: {
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.75,
        height: 160,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: 60,
        right: Dimensions.get('window').width * 0.07,
        zIndex: -1,

    },
    logo: {
        width: Dimensions.get('window').width * 0.5,
        height: 82,
        resizeMode: 'stretch',
    },
    content: {
        width: Dimensions.get('window').width * 1,
        top: 70,
        position: 'absolute',
        zIndex: 0,
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },


    text2: {
        fontFamily: fontFamily.Regular,
        fontSize: 14,
        color: Colors.GRAY_TEXT2,
        textAlign: 'center'
    },

    item: {
        backgroundColor: Colors.YELLOW_PALE,
        height: 30,
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
    },
    checkbox: {
        flexDirection: "row",
        justifyContent: "flex-start",

    },
    title: {
        color: Colors.BLACK,
        fontSize: 20,
        fontFamily: fontFamily.Bold,
        textAlign: 'center',
        marginTop: 29,
        marginBottom: 10
    }

});

export default Register;
