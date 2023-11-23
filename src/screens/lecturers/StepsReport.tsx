/* eslint-disable prettier/prettier */
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Header } from '../../component/Header';
import { Colors, STATUS, STATUS_DONE, fontFamily } from '../../../assets';
import { Button } from '../../component/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigate/StackHome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../context/AppCotext';

type PropsType = NativeStackScreenProps<RootStackParamList, 'StepsReport'>;
const StepsReport: React.FC<PropsType> = props => {
   const { navigation } = props;
   const appContext = useContext(AppContext);

   if (!appContext) {
      // Xử lý khi không có giá trị trong AppContext
      return null;
   }

   const { infoUser, setinfoUser } = appContext;
   const { infoReport, setinfoReport } = appContext;
   console.log(infoReport)

   const time = infoReport.time as string;
   const timetwo = infoReport.step_two.time as string;
   const timethree = infoReport.step_three.time as string;


   
   const dateTime = new Date(time);
   const dateTimetwo = new Date(timetwo);
   const dateTimethree = new Date(timethree);


   // Lấy giờ và ngày từ đối tượng Date
   const hours = dateTime.getHours();
   const minutes = dateTime.getMinutes();
   const hourstwo = dateTimetwo.getHours();
   const minutestwo = dateTimetwo.getMinutes();
   const hoursthree = dateTimethree.getHours();
   const minutesthree = dateTimethree.getMinutes();
   const seconds = dateTime.getSeconds();
   const year = dateTime.getFullYear();
   const month = dateTime.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cần cộng thêm 1
   const day = dateTime.getDate();
   // useEffect(() => {
   //    const timeout = setTimeout(() => {
   //       navigation.navigate('HomeInner');
   //    }, 15000);

   //    return () => clearTimeout(timeout);
   // }, []);
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar
            barStyle="dark-content"
            backgroundColor={'transparent'}
            translucent />
         <Header
            title='Yêu cầu hỗ trợ'
            onPress={() => navigation.navigate('FormReport')} />

         <View style={styles.itemCard}>
            <Image
               source={{uri:infoReport.avatar}}
               style={styles.imgAvatar} />
            <View style={styles.itemContent}>
               <Text style={styles.txtTitle}>{infoReport.description}</Text>
               <View style={styles.nameContent}>
                  <Text style={styles.txtTitleItem}>Người yêu cầu: </Text>
                  <Text style={styles.txtNameStaff}> {infoReport.name_user} </Text>
               </View>
               {/* <View style={styles.nameContent}>
                  <Text style={styles.txtTitleItem}>SĐT:</Text>
                  <Text style={styles.txtNameStaff}>{infoReport.description} </Text>
               </View> */}
               <View style={styles.nameContent}>
                  <Text style={styles.txtDate}>Ngày: {day +'/'+ month+'/'+year}</Text>
                  <Text style={styles.txtTime}>Giờ: {hours +':'+ minutes}</Text>                
               </View>
               <Text style={[styles.txtTime,{marginLeft:0}]}>Phòng: {infoReport.room}</Text>
            </View>
         </View>
         <Text style={styles.txtStatus}>Trạng thái yêu cầu</Text>
         <View style={styles.itemStatus}>
            <Image style={styles.imgStatus} source={STATUS_DONE} />
            <View style={styles.itemContentStatus}>
               <Text style={styles.txtTitleStatus}>Yêu cầu</Text>
               <Text style={styles.txtTimeStatus}> {hours +':'+ minutes}</Text>
            </View>
         </View>
         <View style={styles.line} />
         <View style={styles.itemStatus}>
            <Image style={styles.imgStatus} source={infoReport.step_two.status? STATUS_DONE:STATUS} />
            <View style={styles.itemContentStatus}>
               <Text style={styles.txtTitleStatus}>Yêu cầu đã được tiếp nhận</Text>
               <Text style={styles.txtTimeStatus}> Giờ: {infoReport.step_two.status ? hourstwo+':'+ minutestwo:'----'}</Text>
            </View>
         </View>
         <View style={styles.line} />
         <View style={styles.itemStatus}>
            <Image style={styles.imgStatus} source={infoReport.step_three.status? STATUS_DONE:STATUS} />
            <View style={styles.itemContentStatus}>
               <Text style={styles.txtTitleStatus}>Yêu cầu hoàn thành</Text>
               <Text style={styles.txtTimeStatus}> Giờ: {infoReport.step_three.status ? hoursthree+':'+ minutesthree:'----'}</Text>
            </View>
         </View>
         <Button title='Phản hồi' viewStyle={{ width: '100%', marginTop: 24 }}></Button>
      </SafeAreaView>
   );
};

export default StepsReport;

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
      alignItems:'center',
      marginTop: 16,
   },
   container: {
      paddingHorizontal: 24,
      flex: 1,
   },
});