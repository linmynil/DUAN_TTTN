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
  _id: string;
  // avatar: ImageSourcePropType;
  id_user: {
    id: string;
    name: string;
  }
  room: string;
  avatar: string;
  category: string[];
  phone: string;
  time: string;
  description: string;
  name_user: string;
  step_two: {
    time: string,
    status: boolean
  },
  step_three: {
    time: string,
    status: boolean
  },
  review: {
    star: number,
    content: string,
  },
  img_report: string[];

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
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title} >{item.description}</Text>
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: item.avatar }}  ></Image>
        <View>
          <Text style={[styles.title, { fontSize: 14, fontFamily: fontFamily.Medium }]}> {item.name_user}</Text>
          <View style={styles.row}>
            <Text style={styles.itemText}>  Phòng: {item.room}</Text>
            <Text style={styles.itemText}>Giờ: {hours + ':' + minutes}</Text>
            <Text style={styles.itemText}>Ngày: {day + ':' + month + ':' + year}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

};
type PropsType = NativeStackScreenProps<RootStackParamList, 'Report'>;
const Report: React.FC<PropsType> = props => {
  const { navigation } = props;
  const [selectTab, setSelectTab] = useState(0);
  const [dataReports, setDataReports] = React.useState<Item[]>();
  const [waitReports, setwaitReports] = React.useState<Item[] | undefined>();
  const handleSelect = (item: Item) => {
    const name = item.name_user as string;
    const phone = item.phone as string;
    const avatar = item.avatar as string
    const time = item.time as string
    const room = item.room as string
    const id = item._id as string
    const description = item.description as string
    const step_two_status = item.step_two.status;
    const step_three_status = item.step_three.status
    const category = item.category[0] as string
    const img_report = item.img_report as string[]
    navigation.navigate('Detail', { phone, name, avatar, time, room, description, id, step_three_status, step_two_status, category, img_report });
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.1.17:3000/report/getAllStepone");
      const reportData = response.data;
      setDataReports(reportData.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  const fetchWaitData = async () => {
    try {
      const response = await axios.get("http://192.168.1.17:3000/report/getAllSteptwo");
      const waitReports = response.data;
      setwaitReports(waitReports.reverse())
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchWaitData();
    const interval = setInterval(() => {
      fetchData();
      fetchWaitData();
    }, 
    1000);
    // Tải lại dữ liệu sau mỗi 1 phút (60000 milliseconds)

    return () => {
      clearInterval(interval); // Hủy cơ chế tải lại định kỳ khi component bị unmount
    };
  }, []);

  const renderReports = (reports: Item[] | undefined) => {
    if (reports == undefined) {
      return null;
      // Xử lý trường hợp reports là undefined
    } else {
      return (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <ScrollView style={styles.tab}>
            {reports.map((item: Item, index: number) => (
              <Item item={item} key={index} onPress={() => handleSelect(item)} />
            ))}
          </ScrollView>
        </ScrollView>
      );
    }

  };


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
        <View>
          {selectTab === 0 ? renderReports(dataReports) : renderReports(waitReports)}
        </View>
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
