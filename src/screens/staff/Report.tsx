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
import { LecturesContext } from '../utilities/LecturesContext';
import axios from 'axios';

type Item = {
  id: string;
  avatar: ImageSourcePropType;
  nameUser: string;
  room: string;
  time: string;
  description: string;
};

type ItemProps = {
  item: Item;
  onPress: () => void;
};
const Item = ({ item, onPress }: ItemProps) => {
  const time = item.time;
  const date = time.substring(0, 10);
  const timedetail = time.substring(11, 19);
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{item.description}</Text>
      <View style={styles.row}>
        <Image style={styles.avatar} source={item.avatar}  ></Image>
        <View>
          <Text style={[styles.title, { fontSize: 13 }]}>{item.nameUser}</Text>
          <View style={styles.row}>
            <Text style={styles.itemText}>Phòng: {item.room}</Text>
            <Text style={styles.itemText}>{timedetail}</Text>
            <Text style={styles.itemText}>{date}</Text>
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
  const [dataReports, setDataReports] = React.useState<Item[]>(
    // [{
    //   id: '1',
    //   title: 'Sự cố máy chiếu hỏng',
    //   avatar: IMAGE_LOGIN,
    //   name: 'Lê Minh Hiếu',
    //   room: 'T1103',
    //   time: '2023-10-18T12:34:56'
    // },
    // {
    //   id: '2',
    //   title: 'Sự cố máy chiếu hỏng',
    //   avatar: IMAGE_LOGIN,
    //   name: 'Lê Minh Hiếu',
    //   room: 'T1103',
    //   time: '2023-10-18T12:34:56'
    // },
    // {
    //   id: '3',
    //   title: 'Sự cố máy chiếu hỏng',
    //   avatar: IMAGE_LOGIN,
    //   name: 'Lê Minh Hiếu',
    //   room: 'T1103',
    //   time: '2023-10-21T00:59:29.042Z'
    // },
    // {
    //   id: '4',
    //   title: 'Sự cố máy chiếu hỏng',
    //   avatar: IMAGE_LOGIN,
    //   name: 'Lê Minh Hiếu',
    //   room: 'T1103',
    //   time: '2023-10-18T12:34:56'
    // },
    // {
    //   id: '5',
    //   title: 'Sự cố máy chiếu hỏng',
    //   avatar: IMAGE_LOGIN,
    //   name: 'Lê Minh Hiếu',
    //   room: 'T1103',
    //   time: '2023-10-20T16:55:31.317+00:00'
    // },
    // ]
  );
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
      <View style={styles.switchButton}>
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
            <View style={styles.tab}>
              {dataReports?.map((item: Item) => (
                <Item item={item} key={item.id} onPress={() => handleSelect(item)} />
              ))}
            </View>
          </ScrollView>

        ) : (
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.tab}>
              {dataReports?.map((item: Item) => (
                <Item item={item} key={item.id} onPress={() => handleSelect(item)} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
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
    height: '90%',
    marginTop: 35,
    backgroundColor: Colors.GRAY_PALE2,
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 100,
    marginRight: 13
  },
  item: {
    flexDirection: 'column',
    marginHorizontal: 4,
    height: 100,
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
    paddingBottom: 18,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.Medium,
    color: Colors.BLACK,
    lineHeight: 25,
    marginLeft: 5
  },
  row: {
    flexDirection: 'row'
  },
  itemText: {
    fontSize: 12,
    fontFamily: fontFamily.Medium,
    color: Colors.GRAY_TEXT,
    marginRight: 10
  }


});

export default Report;
