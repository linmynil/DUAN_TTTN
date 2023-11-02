
import React, { useEffect } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Pressable
} from 'react-native';
import { ARROW_RIGHT, Colors, fontFamily } from '../../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '../../component/Header';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { ContactStackParamList } from '../../navigate/ContactStack';

type Item = {
    id: string;
    name: string,
    phone:string,
    email: string,
    avatar: string,
    phoneNumber: string,
    createdAt: string,

};

type ItemProps = {
    item: Item;
    onPress: () => void;
};
const Item = ({ item, onPress }: ItemProps) => {
    const time = item.createdAt as string;
    const dateTime = new Date(time);
    // Lấy giờ và ngày từ đối tượng Date
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cần cộng thêm 1
    const day = dateTime.getDate();
    return (
            <View style={styles.item} >
                <Image style={styles.avatar} source={{uri:item.avatar}}  ></Image>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.title} numberOfLines={2} >{item.name}</Text>
                        <Text style={styles.itemText}>Nhân viên</Text>
                    </View>
                    <Pressable  onPress={onPress} >
                    <Image style={[styles.avatar,{width:24, height:24 }]} source={ARROW_RIGHT}  ></Image>
                    </Pressable>                   
                </View>

            </View>
    );

};
type PropsType = NativeStackScreenProps<ContactStackParamList, 'ContactInner'>;
const Contact: React.FC<PropsType> = (props) => {
    const { navigation} = props;
    
    const [dataReports, setDataReports] = React.useState<Item[]>();
    const handleSelect = (item: Item) => {
        const name = item.name as string;
        const email = item.email as string;
        const phone = item.phoneNumber as string;
        navigation.navigate('DetailContact',{email,phone,name});
    };
    const fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.1.19:3000/user/1/getAllStaff");
            const reportData = response.data;
            setDataReports(reportData);
            console.log("============DATANENENENE==============",  response.data);
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
            <Header title='Liên hệ ' iconStyle={{ display: 'none' }}></Header>
            <ScrollView  showsHorizontalScrollIndicator={false} style={styles.list}  >
                {dataReports?.map((item: Item, index: number) => (
                    <Item key={index} item={item} onPress={() => handleSelect(item)} />
                ))}
            </ScrollView>

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
        flexDirection: 'row',
        marginHorizontal: 4,
        height: 90,
        borderRadius: 8,
        backgroundColor: Colors.YELLOW_PALE,
        marginBottom: 21,
        elevation: 4, // Độ cao của bóng
        shadowColor: Colors.BLACK, // Màu sắc của bóng
        shadowOpacity: 0.3, // Độ mờ của bóng (từ 0 đến 1)
        shadowOffset: { width: 4, height: 0 }, // Độ dịch chuyển theo chiều ngang và dọc của bóng
        shadowRadius: 4, // Bán kính của bóng,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems:'center'
    },
    title: {
        fontSize: 16,
        fontFamily: fontFamily.Bold,
        color: Colors.BLACK,
        lineHeight: 25,
    },
    row: {
        flexDirection: 'row',
        width:'80%',
         justifyContent:'space-between',
         alignItems:'center'
    },
    itemText: {
        marginTop: 8,
        fontSize: 14,
        fontFamily: fontFamily.Medium,
        color: Colors.GRAY_TEXT2,
        marginRight: 10,
    },
    list: {
        marginTop: 29
    }
});

export default Contact;
