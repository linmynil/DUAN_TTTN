/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ImageSourcePropType, StatusBar }
  from 'react-native';
import { Header } from '../../component/Header';
import { Colors, IMAGE_LOGIN, fontFamily } from '../../../assets'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigate/StackHome';
import axios from 'axios';


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
};

type ItemProps = {
  item: Item;
  onPress: () => void;
};
const Item = ({ item, onPress }: ItemProps) => {
  const time = item.time as string;
  const dateTime = new Date(time);
console.log(item.id)
  // Lấy giờ và ngày từ đối tượng Date
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cần cộng thêm 1
  const day = dateTime.getDate();
  return (
    <TouchableOpacity onPress={onPress}  style={styles.item }>
      <Text style={styles.title} >{item.description}</Text>
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: 'https://inkythuatso.com/uploads/images/2021/12/logo-fpt-polytechnic-inkythuatso-09-12-57-46.jpg' }}  ></Image>
        <View>
            <Text style={[styles.title, { fontSize: 14, fontFamily: fontFamily.Medium}]}> {item.name_user}</Text>
          <View style={styles.row}>
            <Text style={styles.itemText}>  Phòng: {item.room}</Text>
            <Text style={styles.itemText}>{hours +':'+ minutes+':'+seconds}</Text>
            <Text style={styles.itemText}>{day +':'+ month+':'+year}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

};
type PropsType = NativeStackScreenProps<RootStackParamList, 'Report'>;
const Report: React.FC<PropsType> = props => {
  const { navigation, route } = props;
  const id_user = route.params?.id;
  const name_user = route.params?.name as string;
  console.log(id_user)
  const [selectTab, setSelectTab] = useState(0);
  const [dataReports, setDataReports] = React.useState<Item[]>();
  const handleSelect = (item: Item) => {
    navigation.navigate('Detail');
    console.log(item.id);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.1.10:3000/report/getALL_reportsApp");
      const reportData = response.data;
      console.log("==========================", reportData);
      setDataReports(reportData);
      // console.log("============DATANENENENE==============",data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent />
      <Header title='Sự cố ' onPress={() => navigation.goBack()}></Header>
      <ScrollView style={styles.switchButton}>
        <View style={styles.bordertab}>
          <TouchableOpacity onPress={() => setSelectTab(0)} style={[styles.button, { backgroundColor: selectTab == 0 ? Colors.YELLOW : Colors.WHITE }]}>
            <Text style={[styles.text, { color: selectTab == 0 ? Colors.WHITE : Colors.GRAY_TEXT }]}>Sự cố hiện có</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectTab(1)} style={[styles.button, { backgroundColor: selectTab == 1 ? Colors.YELLOW : Colors.WHITE }]}>
            <Text style={[styles.text, { color: selectTab == 1 ? Colors.WHITE : Colors.GRAY_TEXT }]}>Đang tiếp nhận</Text>
          </TouchableOpacity>
        </View>
        {selectTab == 0 ? (
          <ScrollView showsHorizontalScrollIndicator={false}>
            <ScrollView style={styles.tab}>
              {dataReports?.map((item: Item) => (
                <Item item={item} key={item.id} onPress={() => handleSelect(item)} />
              ))}
            </ScrollView>
          </ScrollView>

        ) : (
          <ScrollView showsHorizontalScrollIndicator={false}>
            <ScrollView style={styles.tab}>
              {dataReports?.map((item: Item) => (
                <Item item={item} key={item.id} onPress={() => handleSelect(item)} />
              ))}
            </ScrollView>
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 21,
    paddingHorizontal: 24,
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
    height: 54,
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
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.GRAY_PALE,
    marginRight: 13,
  },
  item: {
    flexDirection: 'column',
    marginHorizontal: 4,
    height: 120,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    marginBottom: 21,
    elevation: 4, // Độ cao của bóng
    shadowColor: Colors.BLACK, // Màu sắc của bóng
    shadowOpacity: 0.3, // Độ mờ của bóng (từ 0 đến 1)
    shadowOffset: { width: 4, height: 0 }, // Độ dịch chuyển theo chiều ngang và dọc của bóng
    shadowRadius: 4, // Bán kính của bóng,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 24,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.Medium,
    color: Colors.BLACK,
    lineHeight: 25,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
  },
  itemText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: fontFamily.Medium,
    color: Colors.GRAY_TEXT,
    marginRight: 10,
    paddingBottom: -16
  }


});

export default Report;
