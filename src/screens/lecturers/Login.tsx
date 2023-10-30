/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
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
import { ARROW_DOWN, Colors, EMAIL, IMAGE_LOGIN, LOGO, PASSWORD, SUBTRACT, TOGGLE, TOGGLE_CLICK, USER, fontFamily } from '../../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigate/StackHome';
import { TextField } from '../../component/TextField';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Button } from '../../component/Button';
import axios from 'axios';

type Item = {
    id: string;
    title: string
};

type ItemProps = {
    item: Item;
    onPress: () => void;
};

type PropsType = NativeStackScreenProps<RootStackParamList, 'Login'>;
const Login: React.FC<PropsType> = props => {
    const { navigation } = props;
    // const [toggle, setToggle] = useState(false);
    const [text, setText] = useState('Chọn cơ sở đào tạo');
    // const [toggleStaff, setToggleStaff] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
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

    const [checkboxState, setCheckboxState] = useState(false);
    const checkRemember = () => {
        setCheckboxState(!checkboxState);
    };
    // const handleToggle = () => {
    //     setToggle(!toggle);
    //     setToggleStaff(false);
    // };
    // const handleToggleStaff = () => {
    //     setToggleStaff(!toggleStaff);
    //     setToggle(false);
    // };


    const [data, setData] = React.useState<Item[]>(
        [{
            id: '1',
            title: 'Hồ Chí Minh',
        },
        {
            id: '2',
            title: 'Đà Nẵng',
        },
        {
            id: '3',
            title: 'Hà Nội',
        },
        {
            id: '4',
            title: 'Cần Thơ',
        },
        {
            id: '5',
            title: 'Tây Nguyên',

        },
        ]
    );

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://192.168.1.11:3000/user/login", {
                email: email,
                password: password,
            });
            const id_user = response.data.user._id; // Lấy giá trị id_user từ response.data
            console.log('id_user:', id_user);
            console.log('=>>>>>>', response.data.user.role);
            ToastAndroid.show('Login Success', ToastAndroid.SHORT);
            navigation.navigate('Home', { role: response.data.user.role});
            // Lấy thông tin avatar và username từ response.data và lưu vào state
            const avatar = response.data.user.avatar;
            const username = response.data.user.username;
            setAvatar(avatar);
            setUsername(username);

        } catch (error) {
            console.error(error);
            ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
        }
    };
    const Item = ({ item, onPress }: ItemProps) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor: item.id === selectedId ? Colors.YELLOW : Colors.YELLOW_PALE }]}>
            <Text style={[styles.text2, { color: item.id === selectedId ? Colors.WHITE : Colors.GRAY_TEXT2 }]}>{item.title}</Text>
        </TouchableOpacity>
    );
    const handleSelect = (item: Item) => {
        setSelectedId(item.id);
        setText(item.title)
        setModalVisible(!modalVisible);
    }
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
                {/* <View style={[styles.row, { marginTop: 29, marginBottom: 33 }]}>
                    <TouchableOpacity onPress={handleToggle}>
                        <Image
                            source={toggle ? TOGGLE_CLICK : TOGGLE}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.text, { marginRight: 15 }]}>Giảng viên</Text>
                    <TouchableOpacity onPress={handleToggleStaff}>
                        <Image
                            source={toggleStaff ? TOGGLE_CLICK : TOGGLE}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}>Nhân viên</Text>
                </View> */}

                <View style={styles.button}>
                    <Text style={[styles.text2, { width: Dimensions.get('window').width * 0.4 }]}>{text}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            source={ARROW_DOWN}
                            style={styles.arrow}
                        />
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.text}>Chọn cơ sở đào tạo!</Text>
                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}>
                                        {data.map((item: Item) => (
                                            <Item item={item} key={item.id} onPress={() => handleSelect(item)} />))}
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </TouchableOpacity>
                </View>
                <TextField
                    imageIconLeft={EMAIL}
                    iconLeftStyle={{ height: 22, width: 24 }}
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
                <View style={[styles.row, { justifyContent: 'space-between', width: Dimensions.get('window').width * 0.86, marginTop: 39 }]}>
                    <View style={styles.checkbox}>
                        <BouncyCheckbox
                            size={24}
                            fillColor={Colors.YELLOW}
                            unfillColor={Colors.WHITE}
                            iconStyle={{ borderRadius: 2, borderColor: Colors.YELLOW }}
                            innerIconStyle={{ borderRadius: 2, borderWidth: 1, borderColor: Colors.GRAY_TEXT2 }}
                            onPress={checkRemember}
                            isChecked={checkboxState}
                        />
                        <Text style={[styles.text2, { color: Colors.GRAY_TEXT, }]}>Remember password</Text>
                    </View>
                    <Pressable onPress={() => { navigation.navigate("Register"); }}>
                        <Text style={[styles.text2, { color: Colors.BLUE, }]}>Forget password</Text>
                    </Pressable>
                </View>
                <Button status={true} title='Đăng nhập' onPress={() => {
                    handleLogin(); console.log(">>>>");
                }} viewStyle={{ width: Dimensions.get('window').width * 0.86, position: 'absolute', bottom: -70, zIndex: 0 }}></Button>
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
    icon: {
        width: 17,
        height: 17,
        marginRight: 5
    },
    gg: {
        width: 26,
        height: 26,
    },
    arrow: {
        width: 12,
        height: 7,
    },
    text: {
        fontFamily: fontFamily.Black,
        fontSize: 14,
        color: Colors.BLACK,
    },
    text2: {
        fontFamily: fontFamily.Regular,
        fontSize: 14,
        color: Colors.GRAY_TEXT2,
        textAlign: 'center'

    },
    button: {
        marginTop: 35,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.86,
        borderRadius: 12,
        backgroundColor: Colors.WHITE,
        height: 48,
        alignItems: 'center',
        paddingHorizontal: 18,
        justifyContent: 'center',
    },
    modalView: {
        height: Dimensions.get('window').height * 0.38,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    item: {
        backgroundColor: Colors.YELLOW_PALE,
        height: 30,
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        width: Dimensions.get('window').width * 0.45,
        justifyContent: 'center',
    },
    checkbox: {
        flexDirection: "row",
        justifyContent: "flex-start",
    }
});
export default Login;
