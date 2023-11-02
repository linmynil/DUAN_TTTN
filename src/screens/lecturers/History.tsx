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
import { Colors, fontFamily } from '../../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HistoryStackParamList } from '../../navigate/HistoryStack';
import { Header } from '../../component/Header';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

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
    step_two: {
        time: string,
        status: boolean
    }
};

type ItemProps = {
    item: Item;
    onPress: () => void;
};
const Item = ({ item, onPress }: ItemProps) => {
    const time = item.time as string;
    const dateTime = new Date(time);
    // Lấy giờ và ngày từ đối tượng Date
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cần cộng thêm 1
    const day = dateTime.getDate();
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}  >
            <View style={styles.row}>
                <Text style={[styles.itemText, { position: 'absolute',right:-10,top:-10,color: item.step_two.status?Colors.GREEN:Colors.RED}]}>{item.step_two.status?'Hoàn thành' : 'Chưa đánh giá'}</Text>
                <Image style={styles.avatar} source={{ uri: 'https://inkythuatso.com/uploads/images/2021/12/logo-fpt-polytechnic-inkythuatso-09-12-57-46.jpg' }}  ></Image>
                <View>
                    <Text style={styles.title} >{item.description}</Text>
                    <Text style={styles.itemText}>Người tiếp nhận: {item.name_user}</Text>
                    <View style={styles.row}>
                        <Text style={styles.itemText}>{day + ':' + month + ':' + year}</Text>
                        <Text style={styles.itemText}>{hours + ':' + minutes}</Text>
                        <Text style={styles.itemText}>Phòng: {item.room}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

};
type PropsType = NativeStackScreenProps<HistoryStackParamList, 'HistoryInner'>;
const History: React.FC<PropsType> = (props) => {
    const { navigation, route } = props;
    const [dataReports, setDataReports] = React.useState<Item[]>();
    const [selectTab, setSelectTab] = useState(0);
    const handleSelect = (item: Item) => {
        navigation.navigate('DetailHistory');
        console.log(item.id);
    };
    const fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.1.19:3000/report/getALL_reportsApp");
            const reportData = response.data;
            setDataReports(reportData);
            console.log("============DATANENENENE==============",response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    // Tham số thứ hai là một mảng rỗng để đảm bảo useEffect chỉ được gọi một lần khi component được tạo
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
            <Header title='Lịch sử ' iconStyle={{ display: 'none' }}></Header>
        <View style={styles.switchButton}>
        <View style={styles.bordertab}>
          <TouchableOpacity onPress={() => setSelectTab(0)} style={[styles.button, { backgroundColor: selectTab == 0 ? Colors.RED : Colors.WHITE }]}>
            <Text style={[styles.text, { color: selectTab == 0 ? Colors.WHITE : Colors.GRAY_TEXT }]}>Đã tiếp nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectTab(1)} style={[styles.button, { backgroundColor: selectTab == 1 ? Colors.GREEN : Colors.WHITE }]}>
            <Text style={[styles.text, { color: selectTab == 1 ? Colors.WHITE : Colors.GRAY_TEXT }]}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
        {selectTab == 0 ? (
          <ScrollView showsHorizontalScrollIndicator={false}>
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.list} >
                {dataReports?.map((item: Item, index: number) => (
                    <Item key={index} item={item} onPress={() => handleSelect(item)} />
                ))}
            </ScrollView>
          </ScrollView>

        ) : (
          <ScrollView showsHorizontalScrollIndicator={false}>
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.list} >
                {dataReports?.map((item: Item, index: number) => (
                    <Item key={index} item={item} onPress={() => handleSelect(item)} />
                ))}
            </ScrollView>
          </ScrollView>
        )}
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
        width: '50%',
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
        height: 120,
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
        marginTop:10,
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
    marginTop:29
    }
});

export default History;
