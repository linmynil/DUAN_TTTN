/* eslint-disable prettier/prettier */
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Header } from '../../component/Header';
import { Colors, STATUS, STATUS_DONE, fontFamily } from '../../../assets';
import { Button } from '../../component/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HistoryStackParamList } from '../../navigate/HistoryStack';

type PropsType = NativeStackScreenProps<HistoryStackParamList, 'DetailHistory'>;
const DetailHistory: React.FC<PropsType> = props => {
    const { navigation } = props;
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar
          barStyle="dark-content"
                backgroundColor={'transparent'}
                translucent />
         <Header
            title='Yêu cầu hỗ trợ'
            onPress={()=>navigation.goBack()} />

         <View style={styles.itemCard}>
            <Image
               source={STATUS_DONE}
               style={styles.imgAvatar} />
            <View style={styles.itemContent}>
               <Text style={styles.txtTitle}>Sự cố máy chiếu hỏng</Text>
               <View style={styles.nameContent}>
                  <Text style={styles.txtTitleItem}>Người tiếp nhận: </Text>
                  <Text style={styles.txtNameStaff}>Nguyễn Văn A </Text>
               </View>
               <View style={styles.nameContent}>
                  <Text style={styles.txtTitleItem}>SĐT:</Text>
                  <Text style={styles.txtNameStaff}>0971761090 </Text>
               </View>
               <View style={styles.nameContent}>
                  <Text style={styles.txtDate}>09/10/2023</Text>
                  <Text style={styles.txtTime}>09:35am</Text>
                  <Text style={styles.txtTime}>T1001</Text>
               </View>
            </View>
         </View>
         <Text style={styles.txtStatus}>Trạng thái yêu cầu</Text>
         <View style={styles.itemStatus}>
            <Image style={styles.imgStatus} source={STATUS_DONE} />
            <View style={styles.itemContentStatus}>
               <Text style={styles.txtTitleStatus}>Yêu cầu</Text>
               <Text style={styles.txtTimeStatus}> 09:32 am</Text>
            </View>
         </View>
         <View style={styles.line} />
         <View style={styles.itemStatus}>
            <Image style={styles.imgStatus} source={STATUS} />
            <View style={styles.itemContentStatus}>
               <Text style={styles.txtTitleStatus}>Yêu cầu đã được tiếp nhận</Text>
               <Text style={styles.txtTimeStatus}> 09:32 am</Text>
            </View>
         </View>
         <View style={styles.line} />
         <View style={styles.itemStatus}>
            <Image style={styles.imgStatus} source={STATUS} />
            <View style={styles.itemContentStatus}>
               <Text style={styles.txtTitleStatus}>Yêu cầu hoàn thành</Text>
               <Text style={styles.txtTimeStatus}> 09:32 am</Text>
            </View>
         </View>
         <Button title='Phản hồi' viewStyle={{width:'100%', marginTop: 24}}></Button>
      </SafeAreaView>
   );
};

export default DetailHistory;

const styles = StyleSheet.create({
   line: {
      height: 70,
      width: 1,
      borderStyle: 'dashed',
      borderWidth: 1,
      marginLeft: 25,
   },
   txtTimeStatus: {
      fontSize: 14,
      fontFamily: fontFamily.Regular,
      color: Colors.GRAY_TEXT,
   },
   txtTitleStatus: {
      fontSize: 16,
      fontFamily: fontFamily.Bold,
      color: Colors.BLACK,
   },
   itemContentStatus: {
      marginLeft: 20,
      width: 200,
      height: 56,
      justifyContent: 'center',
   },
   imgStatus: {
      width: 50,
      height: 50,
   },
   itemStatus: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
   },
   txtStatus: {
      marginTop: 12,
      fontFamily: fontFamily.Medium,
      fontSize: 16,
      color: Colors.BLACK,
      marginBottom: 16,
   },
   txtTime: {
      fontSize: 14,
      color: Colors.BLACK,
      fontFamily: fontFamily.Medium,
      marginLeft: 8,
   },
   txtDate: {
      fontSize: 14,
      color: Colors.BLACK,
      fontFamily: fontFamily.Medium,
   },
   txtNameStaff: {
      fontSize: 14,
      color: Colors.BLACK,
      fontFamily: fontFamily.Medium,
      marginLeft: 4,
   },
   txtTitleItem: {
      fontSize: 14,
      color: Colors.BLACK,
      fontFamily: fontFamily.Regular,
   },
   txtTitle: {
      fontSize: 16,
      color: Colors.BLACK,
      fontFamily: fontFamily.Bold,
      marginBottom: 4,
   },
   nameContent: {
      width: '100%',
      height: 20,
      flexDirection: 'row',
      marginBottom: 4
   },
   itemContent: {
      marginLeft: 16,
      marginVertical: 8,
   },
   imgAvatar: {
      width: 60,
      height: 60,
      borderWidth: 2,
      borderColor: Colors.WHITE,
      borderRadius: 100,
      marginVertical: 28,
   },
   itemCard: {
      width: '100%',
      height: 120,
      borderWidth: 1,
      borderColor: Colors.GRAY_PALE,
      borderRadius: 12,
      backgroundColor: Colors.YELLOW_PALE,
      paddingHorizontal: 12,
      flexDirection: 'row',
      marginTop: 16,
   },
   container: {
      paddingHorizontal: 24,
      flex: 1,
   },
});