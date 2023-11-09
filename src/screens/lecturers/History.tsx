/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
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
import { Colors, fontFamily } from '../../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HistoryStackParamList } from '../../navigate/HistoryStack';
import { Header } from '../../component/Header';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { AppContext } from '../../context/AppCotext';
import moment from 'moment';

type Item = {
    id: string;
    // avatar: ImageSourcePropType;
    id_user: {
        id: string;
        name: string;
    }
    room: string;
    time: string;
    description: string;
    name_user: string;
    name_staff: string,
    phone_staff: string,
    avatar_staff: string
    avatar:string,
    step_two: {
        time: string,
        status: boolean
    },
    step_three: {
        time: string,
        status: boolean
    },
    review: {
        content: string,
        star: string,
        time: string,
    },
};

type ItemProps = {
    item: Item;
    onPress: () => void;
};

type PropsType = NativeStackScreenProps<HistoryStackParamList, 'HistoryInner'>;
const History: React.FC<PropsType> = (props) => {
    const appContext = useContext(AppContext);

    if (!appContext) {
        // Xử lý khi không có giá trị trong AppContext
        return null;
    }

    const { infoUser, setinfoUser } = appContext;
    const role = infoUser.role;
    const name = infoUser.name;
    const avatar = infoUser.avatar;

    const { navigation } = props;
    const [dataReports, setDataReports] = React.useState<Item[] | undefined>();
    const [waitReports, setWaitReports] = React.useState<Item[] | undefined>();
    const [doneReports, setDoneReports] = React.useState<Item[] | undefined>();
    const [selectTab, setSelectTab] = useState(0);
    const [apiTime, setApiTime] = useState('');
    const [timeAgo, setTimeAgo] = useState<number>();
    const handleSelect = (item: Item) => {
        const name_staff = item.name_staff as string;
        const name_user = item.name_user as string;
        const phone = item.phone_staff as string;
        const avatar_staff = item.avatar_staff as string
        const avatar = item.avatar as string
        const step_two_time = item.step_two.time as string
        const step_three_time = item.step_three.time as string
        const time = item.time as string
        const step_two_status = item.step_two.status
        const step_three_status = item.step_three.status
        const room = item.room as string
        const description = item.description as string
        navigation.navigate('DetailHistory', {
            time: time,
            description: description,
            name_staff: name_staff,
            name_user: name_user,
            phone_staff: phone,
            avatar_staff: avatar_staff,
            avatar: avatar,
            step_two_time: step_two_time,
            step_three_time: step_three_time,
            step_two_status: step_two_status,
            step_three_status: step_three_status,
            room: room
        });
    };
    const fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.1.8:3000/report/getAllStepone");
            const reportData = response.data;
            setDataReports(reportData.reverse());
        } catch (error) {
            console.error(error);
        }
    };
    const fetchWaitData = async () => {
        try {
            const response = await axios.get("http://192.168.1.8:3000/report/getAllSteptwo");
            const waitReports = response.data;
            setWaitReports(waitReports)
        } catch (error) {
            console.error(error);
        }
    };
    const fetchDoneData = async () => {
        try {
            const response = await axios.get("http://192.168.1.8:3000/report/getAllHistory");
            const doneReports = response.data;
            setDoneReports(doneReports)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
        fetchWaitData();
        fetchDoneData();
        const interval = setInterval(() => {
            fetchData();
            fetchWaitData();
            fetchDoneData();
        }, 10000); // Tải lại dữ liệu sau mỗi 1 phút (60000 milliseconds)

        return () => {
            clearInterval(interval); // Hủy cơ chế tải lại định kỳ khi component bị unmount
        };
        //     if (apiTime) {
        //         const currentTime = moment();
        //         const apiDateTime = moment(apiTime);
        //         const minutesAgo = currentTime.diff(apiDateTime, 'minutes');

        //         setTimeAgo(minutesAgo);
        //     }
    }, []);
    const Item = ({ item, onPress }: ItemProps) => {
        const time = item.time as string;

        // setApiTime(item.step_two.time);
        // const [timeAgo, setTimeAgo] = useState<number>();
        // console.log(item.step_two.time);

        const dateTime = new Date(time);
        // Lấy giờ và ngày từ đối tượng Date
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const seconds = dateTime.getSeconds();
        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cần cộng thêm 1
        const day = dateTime.getDate();
        return item.step_two.status ?(
            <TouchableOpacity onPress={onPress} style={styles.item}  >
            <View style={styles.row}>
                <Text style={[styles.itemText, { position: 'absolute', right: -10, top: -10, color: item.review == null ? Colors.RED : Colors.GREEN, display: item.step_three.status ? 'flex' : 'none' }]}>{item.review == null ? 'Chưa đánh giá' : 'Hoàn thành'}</Text>
                {/* <Text style={[styles.itemText, { position: 'absolute', right: -10, top: -10, color: Colors.RED, display: item.step_three.status ? 'none' : 'flex' }]}>{item.step_two.time} phút trước</Text> */}
                <Image style={styles.avatar} source={{ uri: item.avatar_staff }}  ></Image>
                <View>
                    <Text style={styles.title} >{item.description}</Text>
                    <Text style={styles.itemText}>Người tiếp nhận: {item.name_staff}</Text>
                    <View style={styles.row}>
                        <Text style={styles.itemText}>Ngày gửi: {day + ':' + month + ':' + year}</Text>
                        <Text style={styles.itemText}>Giờ: {hours + ':' + minutes}</Text>

                    </View>
                    <Text style={styles.itemText}>Phòng: {item.room}</Text>
                </View>
            </View>
        </TouchableOpacity>
        ):(
          
             <TouchableOpacity onPress={onPress} style={styles.item}  >
             <View style={styles.row}>
                 {/* <Text style={[styles.itemText, { position: 'absolute', right: -10, top: -10, color: item.review == null ? Colors.RED : Colors.GREEN, display: item.step_three.status ? 'flex' : 'none' }]}>{item.review == null ? 'Chưa đánh giá' : 'Hoàn thành'}</Text> */}
                 {/* <Text style={[styles.itemText, { position: 'absolute', right: -10, top: -10, color: Colors.RED, display: item.step_three.status ? 'none' : 'flex' }]}>{item.step_two.time} phút trước</Text> */}
                 <Image style={styles.avatar} source={{ uri: item.avatar }}  ></Image>
                 <View>
                     <Text style={styles.title} >{item.description}</Text>
                     <Text style={styles.itemText}>Người gửi: {item.name_user}</Text>
                     <View style={styles.row}>
                         <Text style={styles.itemText}>Ngày gửi: {day + ':' + month + ':' + year}</Text>
                         <Text style={styles.itemText}>Giờ: {hours + ':' + minutes}</Text>
 
                     </View>
                     <Text style={styles.itemText}>Phòng: {item.room}</Text>
                 </View>
             </View>
         </TouchableOpacity>
        )

    };

    const renderReports = (reports: Item[] | undefined) => {
        if (!reports || !Array.isArray(reports)) {
            return null; // Xử lý trường hợp reports là undefined
        }
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                <ScrollView showsHorizontalScrollIndicator={false} style={styles.list}>
                    {reports.map((item: Item, index: number) => (
                        <Item key={index} item={item} onPress={() => handleSelect(item)} />
                    ))}
                </ScrollView>
            </ScrollView>
        );
    };

    const renderTopTab = (selectTab: number) => {
        if (selectTab == 0) {
            return (
                renderReports(dataReports)
            );
        } else if (selectTab == 1) {
            return (
                renderReports(waitReports)
            );
        } else {
            return (
                renderReports(doneReports)
            )

        }

    };
    // Tham số thứ hai là một mảng rỗng để đảm bảo useEffect chỉ được gọi một lần khi component được tạo
    return role == 0 ? (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
            <Header title='Lịch sử ' iconStyle={{ display: 'none' }}></Header>
            <View style={styles.switchButton}>
                <View style={styles.bordertab}>
                    <TouchableOpacity onPress={() => setSelectTab(0)} style={[styles.button, { backgroundColor: selectTab == 0 ? Colors.YELLOW : Colors.WHITE }]}>
                        <Text style={[styles.text, { color: selectTab == 0 ? Colors.WHITE : Colors.YELLOW }]}>Đã gửi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectTab(1)} style={[styles.button, { backgroundColor: selectTab == 1 ? Colors.RED : Colors.WHITE }]}>
                        <Text style={[styles.text, { color: selectTab == 1 ? Colors.WHITE : Colors.RED }]}>Đã tiếp nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectTab(2)} style={[styles.button, { backgroundColor: selectTab == 2 ? Colors.GREEN : Colors.WHITE }]}>
                        <Text style={[styles.text, { color: selectTab == 2 ? Colors.WHITE : Colors.GREEN }]}>Hoàn thành</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {renderTopTab(selectTab)}
                </View>
            </View>

        </SafeAreaView>
    ) : (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
            <Header title='Lịch sử ' iconStyle={{ display: 'none' }}></Header>
            <View style={[styles.list, { marginTop: 0, marginBottom: 50 }]}>
                {renderReports(doneReports)}
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 26,
        backgroundColor: Colors.GRAY_PALE2,
        paddingHorizontal: 24
    },
    switchButton: {
        marginTop: 17,
        height: '100%',
        backgroundColor: Colors.GRAY_PALE2
    },
    bordertab: {
        width: '100%',
        height: 57,
        borderColor: Colors.YELLOW,
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.GRAY_PALE2
    },
    button: {
        width: '33.34%',
        height: 55,
        backgroundColor: Colors.YELLOW,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: fontFamily.Bold,
        color: Colors.GRAY_TEXT
    },
    tab: {
        width: '100%',
        // height: '90%',
        marginTop: 35,
        backgroundColor: Colors.GRAY_PALE2,
    },
    txtStatus: {
        marginTop: 12,
        fontFamily: fontFamily.Medium,
        fontSize: 16,
        color: Colors.BLACK,
        marginBottom: 16,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.GRAY_PALE,
        marginRight: 13,
        alignSelf: 'center'
    },
    item: {
        flexDirection: 'column',
        marginHorizontal: 4,
        height: 150,
        borderRadius: 8,
        backgroundColor: Colors.YELLOW_PALE,
        marginBottom: 21,
        elevation: 4, // Độ cao của bóng
        shadowColor: Colors.BLACK, // Màu sắc của bóng
        shadowOpacity: 0.3, // Độ mờ của bóng (từ 0 đến 1)
        shadowOffset: { width: 4, height: 0 }, // Độ dịch chuyển theo chiều ngang và dọc của bóng
        shadowRadius: 4, // Bán kính của bóng,
        paddingTop: 14,
        paddingHorizontal: 16,
        paddingBottom: 24,
        justifyContent: 'center'
    },
    title: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: fontFamily.Bold,
        color: Colors.BLACK,
        lineHeight: 25,
    },
    row: {
        flexDirection: 'row',
    },
    itemText: {
        marginTop: 8,
        fontSize: 14,
        fontFamily: fontFamily.Medium,
        color: Colors.GRAY_TEXT2,
        marginRight: 10,
    },
    list: {
        marginTop: 29,
        marginBottom:150
    }
});

export default History;
