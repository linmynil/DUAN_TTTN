/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Header } from '../../component/Header';
import { CAMERA, Colors, PICTURE, fontFamily } from '../../../assets';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button } from '../../component/Button';

//data list
const data = [
   { key: '1', value: 'Cơ sở vật chất' },
   { key: '2', value: 'Thiết bị mạng' },
   { key: '3', value: 'Vệ sinh phòng học' },
   { key: '4', value: 'Góp ý phòng học' },
   { key: '5', value: 'Sự cố khác' },
];
const FormReport = () => {
   //dropdown pick
   const [selected, setSelected] = useState('');

   //status button
   const [status, setstatus] = useState(true);
   const handleButton = () => {
      setstatus(status);
   };

   return (
      <View style={styles.container}>
         <Header title='Báo cáo sự cố'></Header>
         <View style={styles.inputContainer}>
            <TextInput
               style={styles.inputContent}
               placeholder='Nhập số phòng' />
         </View>
         <View style={styles.selectionItems}>
            <SelectList
               setSelected={setSelected}
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
               numberOfLines={10} />
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
         <Button status={status} title='Gửi yêu cầu' onPress={handleButton} viewStyle={{ width: '100%', marginTop: 16 }}></Button>
      </View>
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
      marginHorizontal: 24,
   },
});