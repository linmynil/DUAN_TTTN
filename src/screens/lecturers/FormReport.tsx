/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, StatusBar, Alert, ToastAndroid } from 'react-native';
import React, { useState, useCallback, useContext } from 'react';
import { Header } from '../../component/Header';
import { CAMERA, Colors, PICTURE, fontFamily } from '../../../assets';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button } from '../../component/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigate/StackHome';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
type PropsType = NativeStackScreenProps<RootStackParamList, 'FormReport'>;


type Category = {
   key: string;
   value: string;
};
//data list
const data: Category[] = [
   { key: '1', value: 'Cơ sở vật chất' },
   { key: '2', value: 'Thiết bị mạng' },
   { key: '3', value: 'Vệ sinh phòng học' },
   { key: '4', value: 'Góp ý phòng học' },
   { key: '5', value: 'Sự cố khác' },
];
const FormReport: React.FC<PropsType> = (props) => {
   const { navigation, route } = props;
   const name = route.params?.name;
   //dropdown pick
   const [selected, setSelected] = useState<string>('');
   const [room, setRoom] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
   //status button
   const [status, setstatus] = useState(true);

   const handleButton = () => {
      setstatus(status);
      navigation.navigate('StepsReport');
   };

   const handleSelectCategory = (value: string) => {
      const category = data.find((item) => item.key === value);
      setSelectedCategory(category || null);
      setSelected(value);
   };
   const handleAddReports = async () => {
      try {
         const response = await axios.post("http://192.168.1.9:3000/report/add_report", {
            room: room,
            description: description,
            category: selectedCategory?.value || '',
            name: name
         });
         console.log(response);
         ToastAndroid.show('Add report Success', ToastAndroid.SHORT);
      } catch (error) {
         console.error(error);
         ToastAndroid.show('Add report Failed', ToastAndroid.SHORT);
      }
   };
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content"
            backgroundColor={'transparent'}
            translucent />
         <Header title='Báo cáo sự cố ' onPress={() => navigation.goBack()}></Header>
         <View style={styles.inputContainer}>
            <TextInput
               style={styles.inputContent}
               placeholder='Nhập số phòng'
               value={room}
               onChangeText={setRoom} />
         </View>
         <View style={styles.selectionItems}>
            <SelectList
               setSelected={handleSelectCategory}
               data={data}
               search={false}
               boxStyles={{ borderRadius: 12, backgroundColor: Colors.WHITE, borderColor: Colors.GRAY_PALE, height: 48 }} //override default styles
               inputStyles={{ color: Colors.GRAY_TEXT, fontFamily: fontFamily.Regular }}
               defaultOption={{ key: '1', value: 'Cở sở vật chất' }} />
         </View>
         <View style={styles.inputDesc}>
            <TextInput
               style={styles.inputContent}
               placeholder='Mô tả sự cố'
               multiline={true}
               textAlignVertical="top"
               numberOfLines={10}
               value={description}
               onChangeText={setDescription} />
         </View>
         <View style={styles.optionImages}>
            <View style={styles.imagesCamera}>
               <Image
                  source={CAMERA} />
            </View>
            <View style={styles.imagesLibrary}>
               <Image
                  source={PICTURE} />
            </View>
         </View>
         <Button status={status} title='Gửi yêu cầu' onPress={() => { handleAddReports() }} viewStyle={{ width: '100%', marginTop: 16 }}></Button>
      </SafeAreaView>
   );
};

export default FormReport;

const styles = StyleSheet.create({
   imagesLibrary: {
      width: 70,
      height: 50,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: Colors.YELLOW,
      alignItems: 'center',
      justifyContent: 'center',
   },
   imagesCamera: {
      width: 70,
      height: 50,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: Colors.YELLOW,
      alignItems: 'center',
      justifyContent: 'center',
   },
   optionImages: {
      width: '100%',
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 32,
   },
   inputDesc: {
      width: '100%',
      height: 100,
      borderWidth: 1,
      borderColor: Colors.GRAY_PALE,
      borderRadius: 12,
      marginTop: 16,
      backgroundColor: Colors.WHITE,
   },
   selectionItems: {
      marginTop: 16,
   },
   inputContent: {
      marginLeft: 24,
      fontSize: 14,
      color: Colors.GRAY_TEXT,
      fontFamily: fontFamily.Medium,
   },
   inputContainer: {
      width: '100%',
      height: 48,
      borderWidth: 1,
      borderColor: Colors.GRAY_PALE,
      borderRadius: 12,
      marginTop: 48,
      backgroundColor: Colors.WHITE,
   },
   container: {
      paddingHorizontal: 24,
      flex: 1
   },
});