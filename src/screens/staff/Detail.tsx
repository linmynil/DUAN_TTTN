import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions, Modal, StatusBar }
    from 'react-native';
import { Header } from '../../component/Header';
import { ARROW_SMALL, CALL_CLICK, Colors, ELLIPSE, fontFamily } from '../../../assets'
import { Button } from '../../component/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigate/StackHome';
import { AppContext } from '../../context/AppCotext';
type Item = {
    id: string;
    title: string
};

type ItemProps = {
    item: Item;
    onPress: () => void;
};

type PropsType = NativeStackScreenProps<RootStackParamList, 'Detail'>;
const Detail: React.FC<PropsType> = props => {
    const appContext = useContext(AppContext);

    if (!appContext) {
        // Xử lý khi không có giá trị trong AppContext
        return null;
    }

    const { infoUser, setinfoUser } = appContext;
    const name_staff = infoUser.name as string;
    const email = infoUser.email as string;
    const phone_staff = infoUser.phoneNumber as string;
    const avatar_staff = infoUser.avatar as string
    console.log(avatar_staff, phone_staff, name_staff)

    const [note, setNote] = useState<string>('');
    const handleOnchangeNote = (value: string) => {
        setNote(value);
    }; 
    const { navigation, route } = props;
    const phone = route.params?.phone;
    const name = route.params?.name;
    const avatar = route.params?.avatar;
    const time = route.params?.time as string;
    const description = route.params?.description;
    const room = route.params?.room;
    const _id = route.params?.id;
    const step_two_status = route.params?.step_two_status;
    const step_three_status = route.params?.step_three_status;
    const category = route.params?.category as string ;


    const dateTime = new Date(time);
    // Lấy giờ và ngày từ đối tượng Date
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cần cộng thêm 1
    const day = dateTime.getDate();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();
    const [stepTwo, setstepTwo] = useState<boolean>();
    const [stepThree, setstepThree] = useState<boolean>();
    useEffect(() => {
        // updateStepTwo();
        // updateStepThree();
    },);
    const [processingStepTwo, setProcessingStepTwo] = useState(false);
    const [processingStepThree, setProcessingStepThree] = useState(false);

    const updateStepTwo = async () => {
        try {
            setProcessingStepTwo(true);
            const response = await fetch(`http://192.168.1.8:3000/report/updateStepTwo/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: _id, name_staff: name_staff, avatar_staff: avatar_staff, phone_staff: phone_staff }),

            }
            );

            if (response.ok) {
                const data = await response.json();
                setstepTwo(step_two_status)
                navigation.navigate('Report')
            } else {
            }

            setProcessingStepTwo(false);
        } catch (error) {
            console.error('Lỗi cập nhật report:', error);
            setProcessingStepTwo(false);
        }
    };


    // Hàm cập nhật bước 3 của report
    const updateStepThree = async () => {
        try {
            setProcessingStepTwo(true);
            const response = await fetch(`http://192.168.1.8:3000/report/updateStepThree/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: _id, note:note}),

            }
            );

            if (response.ok) {
                const data = await response.json();
                setstepThree(step_three_status)
                navigation.navigate('Report')
            } else {
            }

            setProcessingStepTwo(false);
        } catch (error) {
            console.error('Lỗi cập nhật report:', error);
            setProcessingStepTwo(false);
        }
    };

    const [data, setData] = React.useState<Item[]>(
        [{
            id: '1',
            title: 'Cơ sở vật chất'
        },
        {
            id: '2',
            title: 'Thiết bị học'
        },
        {
            id: '3',
            title: 'Vệ sinh phòng học'
        },
        {
            id: '4',
            title: 'Góp ý phòng học'
        },
        {
            id: '5',
            title: 'Sự cố khác'

        },
        ]
    );

    const Item = ({ item, onPress }: ItemProps) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor: item.id === selectedId ? Colors.YELLOW : Colors.YELLOW_PALE }]}>
            <Text style={[styles.text2, { color: item.id === selectedId ? Colors.WHITE : Colors.GRAY_TEXT2 }]}>{item.title}</Text>
        </TouchableOpacity>
    );
    const handleSelect = (item: Item) => {
        setSelectedId(item.id);
        setModalVisible(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
            <Header title={category} onPress={() => navigation.goBack()}></Header>
            <Text style={styles.text}>Tên người yêu cầu:</Text>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <View style={styles.row}>
                    <Image style={styles.avatar} source={{ uri: avatar }}></Image>
                    <View>
                        <Text style={styles.text1} >{name}</Text>
                        <Text style={styles.text2} >{phone}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { }} >
                    <Image style={styles.icon} source={CALL_CLICK}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View>
                    <Text style={styles.text} >Thời gian: </Text>
                    <Text style={styles.text} >Phòng </Text>
                    <Text style={styles.text} >Mô tả sự cố: </Text>
                </View>
                <View>
                    <Text style={[styles.text, { fontFamily: fontFamily.Medium, color: Colors.BLACK }]} >{hours + ':' + minutes + '    ' + day + '/' + month + '/' + year} </Text>
                    <Text style={[styles.text, { fontFamily: fontFamily.Medium, color: Colors.BLACK }]} >{room} </Text>
                    <Text numberOfLines={2} style={[styles.text, { fontFamily: fontFamily.Medium, color: Colors.BLACK }]} >{description}</Text>
                </View>
            </View>
            <View style={[styles.row, { display: stepTwo ? 'flex' : 'none' }]}>
                <View style={styles.card} >
                    <Text style={styles.textcard}>Lỗi sự cố từ</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            source={ARROW_SMALL}
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
                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}>
                                        {data.map((item: Item) => (
                                            <Item item={item} key={item.id} onPress={() => handleSelect(item)} />
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </TouchableOpacity>
                </View>
                <View style={[styles.card, { width: Dimensions.get('window').width * 0.3 }]} >
                    <Text style={styles.textcard}>Thời gian</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            source={ARROW_SMALL}
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
                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}>
                                        {data.map((item: Item) => (
                                            <Item item={item} key={item.id} onPress={() => handleSelect(item)} />
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.card, { width: Dimensions.get('window').width * 0.87, height: 149, alignItems: 'flex-start', marginTop: 12, display: step_two_status ? 'flex' : 'none' }]}>
                <TextInput style={styles.textcard} placeholder='Ghi chú' value={note}
                    onChangeText={handleOnchangeNote}></TextInput>
            </View>

            <View style={[styles.row, { justifyContent: 'space-between', marginTop: 28, display: step_two_status ? 'flex' : 'none' }]} >
                <Button title='Hoàn thành'  onPress={updateStepThree} status={true} viewStyle={{ width: Dimensions.get('window').width * 0.42, backgroundColor: Colors.RED }} />
                <Button title='Chưa xử lí được' onPress={() => { }} status={true} viewStyle={{ width: Dimensions.get('window').width * 0.42, backgroundColor: Colors.GREEN }} />
            </View>
            <Button title='Tiếp nhận' onPress={updateStepTwo} status={true} viewStyle={{ width: 350, marginTop: 51, display: step_two_status ? 'none' : 'flex' }} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 21,
        paddingHorizontal: 24,
        backgroundColor: Colors.GRAY_PALE2
    },
    text: {
        fontFamily: fontFamily.Regular,
        fontSize: 14,
        color: Colors.GRAY_TEXT2,
        marginTop: 28,
        marginBottom: 8
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 100,
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
        fontSize: 18,
        fontFamily: fontFamily.Medium
    },
    text2: {
        color: Colors.BLACK,
        fontSize: 14,
        fontFamily: fontFamily.Regular
    },
    card: {
        flexDirection: 'row',
        marginRight: 26,
        width: Dimensions.get('window').width * 0.5,
        borderRadius: 16,
        backgroundColor: Colors.YELLOW_PALE,
        height: 48,
        alignItems: 'center',
        paddingHorizontal: 18,
        justifyContent: 'space-between',
        marginTop: 28
    },
    modalView: {
        height: Dimensions.get('window').height * 0.25,
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        padding: 5,
        justifyContent: 'center',
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
    arrow: {
        width: 20,
        height: 20,
    },
    textcard: {
        fontFamily: fontFamily.Regular,
        fontSize: 16,
        color: Colors.GRAY_TEXT2,
    },
    item: {
        width: Dimensions.get('window').width * 0.6,
        backgroundColor: Colors.YELLOW_PALE,
        height: 30,
        marginTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 15,
    }
});

export default Detail;
