/* eslint-disable prettier/prettier */
import { Alert, Dimensions, Image, Modal, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { Header } from '../../component/Header';
import { Colors, STAR, STAR_CLICK, STATUS, STATUS_DONE, fontFamily } from '../../../assets';
import { Button } from '../../component/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HistoryStackParamList } from '../../navigate/HistoryStack';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AppContext } from '../../context/AppCotext';

type PropsType = NativeStackScreenProps<HistoryStackParamList, 'DetailHistory'>;
const DetailHistory: React.FC<PropsType> = props => {
   const appContext = useContext(AppContext);

   if (!appContext) {
      // Xử lý khi không có giá trị trong AppContext
      return null;
   }

   const { infoUser, setinfoUser } = appContext;
   const role = infoUser.role;


   const { navigation, route } = props;
   const _id = route.params?.id;
   const name_staff = route.params?.name_staff;
   const name = route.params?.name_user;
   const time = route.params?.time as string;
   const phone = route.params?.phone_staff;
   const avatar_staff = route.params?.avatar_staff
   const avatar = route.params?.avatar
   const step_two_time = route.params?.step_two_time as string;
   const step_three_time = route.params?.step_three_time as string;
   const step_two_status = route.params?.step_two_status
   const step_three_status = route.params?.step_three_status
   const room = route.params?.room
   const description = route.params?.description
   const review_rating = route.params?.review_rating
   const review_content = route.params?.review_content
   const note = route.params?.note
   const reason = route.params?.reason
   const timedone = route.params?.timedone
   const img_report = route.params?.img_report as string[]
   console.log(img_report)





   const dateTime = new Date(time);
   const dateTimetwo = new Date(step_two_time);
   const dateTimethree = new Date(step_three_time);


   // Lấy giờ và ngày từ đối tượng Date
   const hours = dateTime.getHours();
   const minutes = dateTime.getMinutes();
   const year = dateTime.getFullYear();
   const month = dateTime.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cần cộng thêm 1
   const day = dateTime.getDate();
   const hourstwo = dateTimetwo.getHours();
   const minutestwo = dateTimetwo.getMinutes();
   const yeartwo = dateTimetwo.getFullYear();
   const monthtwo = dateTimetwo.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cần cộng thêm 1
   const daytwo = dateTimetwo.getDate();
   const hoursthree = dateTimethree.getHours();
   const minutesthree = dateTimethree.getMinutes();
   const yearthree = dateTimethree.getFullYear();
   const monththree = dateTimethree.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cần cộng thêm 1
   const daythree = dateTimethree.getDate();


   const [modalVisible, setModalVisible] = useState(false);
   const handleModal = () => {
      setModalVisible(true);
   }

   const [rating, setRating] = useState(0);
   const handleRating = (number: number) => {
      setRating(number);

   }
   const [content, setContent] = useState<string>('');
   const handleOnchangeNote = (value: string) => {
      setContent(value);
   };
   const [processingStepTwo, setProcessingStepTwo] = useState(false);
   const [processingStepThree, setProcessingStepThree] = useState(false);
   // Hàm cập nhật bước 3 của report
   const updateReview = async () => {
      try {
         setProcessingStepTwo(true);
         console.log('=>>>', _id, { content, rating })
         const review = { rating, content }
         const response = await fetch(`http://192.168.1.3:3000/report/updateReview/${_id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: _id, rating: rating, content: content }),
         }
         );
         if (response.ok) {
            const data = await response.json();
            console.log(data)

            setModalVisible(!modalVisible)
         } else {
         }

         setProcessingStepTwo(false);
      } catch (error) {
         console.error('Lỗi cập nhật report:', error);
         setProcessingStepTwo(false);
      }
   };
   return role == 0 ? (
      <SafeAreaView style={styles.container}>
         <StatusBar
            barStyle="dark-content"
            backgroundColor={'transparent'}
            translucent />
         <Header
            title='Yêu cầu hỗ trợ'
            onPress={() => navigation.goBack()} />
         <ScrollView>
            <View style={styles.itemCard}>
               <Image
                  source={{ uri: step_two_status ? avatar_staff : avatar }}
                  style={styles.imgAvatar} />
               <View style={styles.itemContent}>
                  <Text style={styles.txtTitle}>{description}</Text>
                  <View style={[styles.nameContent, { display: step_two_status ? 'flex' : 'none' }]}>
                     <Text style={styles.txtTitleItem}>Người tiếp nhận:</Text>
                     <Text style={styles.txtNameStaff}>{name_staff} </Text>
                  </View>

                  <View style={[styles.nameContent, { display: step_two_status ? 'flex' : 'none' }]}>
                     <Text style={styles.txtTitleItem}>SĐT:</Text>
                     <Text style={styles.txtNameStaff}>{phone} </Text>
                  </View>
                  <View style={[styles.nameContent, { display: step_two_status ? 'flex' : 'none' }]}>
                     <Text style={styles.txtTitleItem}>Người gửi:</Text>
                     <Text style={styles.txtNameStaff}>{name} </Text>
                  </View>
                  <View style={styles.nameContent}>
                     <Text style={styles.txtDate}>Ngày gửi: {day + '/' + month + '/' + year}</Text>
                     <Text style={styles.txtTime}>Giờ gửi: {hours + ':' + minutes}</Text>
                  </View>
                  <Text style={[styles.txtTime, { marginLeft: 0 }]}>Phòng: {room}</Text>
               </View>
            </View>

            <View style={[styles.row,{justifyContent:'flex-start'}]}>
               {img_report.map((imageUrl, index) => (
                  <Image key={index} source={{ uri: imageUrl }} style={{ width: 100, height: 100, margin: 10 }} />
               ))}
            </View>
            <Text style={[styles.txtStatus, { display: step_three_status ? 'flex' : 'none' }]}>Ghi chú:</Text>
            <Text style={[styles.txtTimeStatus, { display: step_three_status ? 'flex' : 'none' }]}> {note}</Text>
            <Text style={[styles.txtStatus, { display: step_three_status ? 'flex' : 'none' }]}>Thời gian hoàn thành:</Text>
            <Text style={[styles.txtTimeStatus, { display: step_three_status ? 'flex' : 'none' }]}> {timedone}</Text>
            <Text style={[styles.txtStatus, { display: step_three_status ? 'flex' : 'none' }]}>Lí do:</Text>
            <Text style={[styles.txtTimeStatus, { display: step_three_status ? 'flex' : 'none' }]}>{reason}</Text>

            <Text style={styles.txtStatus}>Trạng thái yêu cầu</Text>
            <View style={styles.itemStatus}>
               <Image style={styles.imgStatus} source={STATUS_DONE} />
               <View style={styles.itemContentStatus}>
                  <Text style={styles.txtTitleStatus}>Yêu cầu</Text>
                  <Text style={styles.txtTimeStatus}> Giờ: {hours + ':' + minutes}</Text>
               </View>
            </View>
            <View style={styles.line} />
            <View style={styles.itemStatus}>
               <Image style={styles.imgStatus} source={step_two_status ? STATUS_DONE : STATUS} />
               <View style={styles.itemContentStatus}>
                  <Text style={styles.txtTitleStatus}>Yêu cầu đã được tiếp nhận</Text>
                  <Text style={styles.txtTimeStatus}> Ngày: {step_two_status ? daytwo + '/' + monthtwo + '/' + yeartwo : '----'}</Text>
                  <Text style={styles.txtTimeStatus}> Giờ: {step_two_status ? hourstwo + ':' + minutestwo : '----'}</Text>
               </View>
            </View>
            <View style={styles.line} />
            <View style={styles.itemStatus}>
               <Image style={styles.imgStatus} source={step_three_status ? STATUS_DONE : STATUS} />
               <View style={styles.itemContentStatus}>
                  <Text style={styles.txtTitleStatus}>Yêu cầu hoàn thành</Text>
                  <Text style={styles.txtTimeStatus}> Ngày: {step_three_status ? daythree + '/' + monththree + '/' + yearthree : '----'}</Text>
                  <Text style={styles.txtTimeStatus}> Giờ: {step_three_status ? hourstwo + ':' + minutestwo : '----'}</Text>

               </View>
            </View>
            <Button title={step_three_status ? 'Đánh giá' : 'Phản hồi'} viewStyle={{ width: '100%', marginTop: 24, display: review_content == null ? 'flex' : 'none' }} status={step_three_status} onPress={handleModal}></Button>
            <Text style={[styles.txtStatus, { display: review_content == null ? 'none' : 'flex' }]}>Đánh giá về yêu cầu</Text>
            <View style={[styles.row, { justifyContent: 'flex-start', marginTop: 0, display: review_content == null ? 'none' : 'flex' }]}>
               <Text style={styles.txtTitleStatus}>{review_rating}</Text>
               <Image style={styles.icon} source={STAR_CLICK}></Image>
            </View>
            <View style={[styles.card, { width: '100%', height: 122, borderWidth: 1, padding: 20, alignItems: 'flex-start', marginTop: 12, display: review_content == null ? 'none' : 'flex', marginBottom: 100 }]}>
               <Text style={styles.txtTimeStatus}>{review_content}</Text>
            </View>
            <Modal
               animationType="slide"
               transparent={true}
               visible={modalVisible}
               onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
               }}>

               <View style={styles.background}>
                  <StatusBar
                     barStyle="dark-content"
                     backgroundColor={'transparent'}
                     translucent />
                  <View style={styles.centeredView}>
                     <View style={styles.modalView}>
                        <Text style={styles.modalText}>Đánh giá</Text>
                        <View style={styles.row}>
                           <Pressable onPress={() => handleRating(1)}>
                              <Image source={rating >= 1 ? STAR_CLICK : STAR}></Image>
                           </Pressable>
                           <Pressable onPress={() => handleRating(2)}>
                              <Image source={rating >= 2 ? STAR_CLICK : STAR}></Image>
                           </Pressable>
                           <Pressable onPress={() => handleRating(3)}>
                              <Image source={rating >= 3 ? STAR_CLICK : STAR}></Image>
                           </Pressable>
                           <Pressable onPress={() => handleRating(4)}>
                              <Image source={rating >= 4 ? STAR_CLICK : STAR}></Image>
                           </Pressable>
                           <Pressable onPress={() => handleRating(5)}>
                              <Image source={rating >= 5 ? STAR_CLICK : STAR}></Image>
                           </Pressable>
                        </View>
                        <View style={[styles.card, { width: '100%', height: 222, alignItems: 'flex-start', marginTop: 12, display: step_two_status ? 'flex' : 'none' }]}>
                           <TextInput style={styles.textcard} placeholder='Nhận xét......' value={content}
                              onChangeText={handleOnchangeNote}></TextInput>
                        </View>
                        <Button title='Đánh giá' viewStyle={{ width: '100%', marginTop: 24, }} status={step_three_status} onPress={updateReview}></Button>
                        {/* <Total left='Logout' title='Cancel' onPressLeft={()=>{navigation.navigate("Login")}}onPressRight={() => setModalVisible(!modalVisible)}></Total> */}
                     </View>
                  </View>
               </View>

            </Modal>
         </ScrollView>

      </SafeAreaView >
   ) : (
      <SafeAreaView style={styles.container}>
         <StatusBar
            barStyle="dark-content"
            backgroundColor={'transparent'}
            translucent />
         <Header
            title='Yêu cầu hỗ trợ'
            onPress={() => navigation.goBack()} />
         <ScrollView>
            <View style={styles.itemCard}>
               <Image
                  source={{ uri: step_two_status ? avatar_staff : avatar }}
                  style={styles.imgAvatar} />
               <View style={styles.itemContent}>
                  <Text style={styles.txtTitle}>{description}</Text>
                  <View style={[styles.nameContent, { display: step_two_status ? 'flex' : 'none' }]}>
                     <Text style={styles.txtTitleItem}>Người tiếp nhận:</Text>
                     <Text style={styles.txtNameStaff}>{name_staff} </Text>
                  </View>

                  <View style={[styles.nameContent, { display: step_two_status ? 'flex' : 'none' }]}>
                     <Text style={styles.txtTitleItem}>SĐT:</Text>
                     <Text style={styles.txtNameStaff}>{phone} </Text>
                  </View>
                  <View style={[styles.nameContent, { display: step_two_status ? 'flex' : 'none' }]}>
                     <Text style={styles.txtTitleItem}>Người gửi:</Text>
                     <Text style={styles.txtNameStaff}>{name} </Text>
                  </View>
                  <View style={styles.nameContent}>
                     <Text style={styles.txtDate}>Ngày gửi: {day + '/' + month + '/' + year}</Text>
                     <Text style={styles.txtTime}>Giờ gửi: {hours + ':' + minutes}</Text>
                  </View>
                  <Text style={[styles.txtTime, { marginLeft: 0 }]}>Phòng: {room}</Text>
               </View>
            </View>
            <View style={[styles.row,{justifyContent:'flex-start'}]}>
               {img_report.map((imageUrl, index) => (
                  <Image key={index} source={{ uri: imageUrl }} style={{ width: 100, height: 100, margin: 10 }} />
               ))}
            </View>
            <Text style={[styles.txtStatus, { display: step_three_status ? 'flex' : 'none' }]}>Ghi chú:</Text>
            <Text style={[styles.txtTimeStatus, { display: step_three_status ? 'flex' : 'none' }]}> {note}</Text>
            <Text style={[styles.txtStatus, { display: step_three_status ? 'flex' : 'none' }]}>Thời gian hoàn thành:</Text>
            <Text style={[styles.txtTimeStatus, { display: step_three_status ? 'flex' : 'none' }]}> {timedone}</Text>
            <Text style={[styles.txtStatus, { display: step_three_status ? 'flex' : 'none' }]}>Lí do:</Text>
            <Text style={[styles.txtTimeStatus, { display: step_three_status ? 'flex' : 'none' }]}>{reason}</Text>

            <Text style={[styles.txtStatus, {}]}>Đánh giá về yêu cầu</Text>
            <View style={[styles.row, { justifyContent: 'flex-start', marginTop: 0, }]}>
               <Text style={styles.txtTitleStatus}>{review_rating}</Text>
               <Image style={styles.icon} source={STAR_CLICK}></Image>
            </View>
            <View style={[styles.card, { width: '100%', height: 122, borderWidth: 1, padding: 20, alignItems: 'flex-start', marginTop: 12 }]}>
               <Text style={styles.txtTimeStatus}>{review_content}</Text>
            </View>

            <Text style={styles.txtStatus}>Trạng thái yêu cầu</Text>
            <View style={styles.itemStatus}>
               <Image style={styles.imgStatus} source={STATUS_DONE} />
               <View style={styles.itemContentStatus}>
                  <Text style={styles.txtTitleStatus}>Yêu cầu</Text>
                  <Text style={styles.txtTimeStatus}> Giờ: {hours + ':' + minutes}</Text>
               </View>
            </View>
            <View style={styles.line} />
            <View style={styles.itemStatus}>
               <Image style={styles.imgStatus} source={step_two_status ? STATUS_DONE : STATUS} />
               <View style={styles.itemContentStatus}>
                  <Text style={styles.txtTitleStatus}>Yêu cầu đã được tiếp nhận</Text>
                  <Text style={styles.txtTimeStatus}> Ngày: {step_two_status ? daytwo + '/' + monthtwo + '/' + yeartwo : '----'}</Text>
                  <Text style={styles.txtTimeStatus}> Giờ: {step_two_status ? hourstwo + ':' + minutestwo : '----'}</Text>
               </View>
            </View>
            <View style={styles.line} />
            <View style={[styles.itemStatus, { marginBottom: 100 }]}>
               <Image style={styles.imgStatus} source={step_three_status ? STATUS_DONE : STATUS} />
               <View style={styles.itemContentStatus}>
                  <Text style={styles.txtTitleStatus}>Yêu cầu hoàn thành</Text>
                  <Text style={styles.txtTimeStatus}> Ngày: {step_three_status ? daythree + '/' + monththree + '/' + yearthree : '----'}</Text>
                  <Text style={styles.txtTimeStatus}> Giờ: {step_three_status ? hourstwo + ':' + minutestwo : '----'}</Text>

               </View>
            </View>

         </ScrollView>

      </SafeAreaView >
   )
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
      height: 170,
      borderWidth: 1,
      borderColor: Colors.GRAY_PALE,
      borderRadius: 12,
      backgroundColor: Colors.YELLOW_PALE,
      paddingHorizontal: 12,
      flexDirection: 'row',
      marginTop: 16,
      alignItems: 'center'
   },
   container: {
      paddingHorizontal: 24,
      flex: 1,
   },
   background: {
      flex: 1,
      backgroundColor: 'rgba(52, 52, 52, 0.4)',

   },
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,

   },
   modalView: {
      width: '87%',
      height: Dimensions.get('window').height * 0.53,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 10,
      paddingTop: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
   },
   buttonOpen: {
      backgroundColor: '#F194FF',
   },
   buttonClose: {
      backgroundColor: '#2196F3',
   },
   textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
   },
   modalText: {
      fontSize: 20,
      color: Colors.BLACK,
      opacity: 1,
      fontFamily: fontFamily.Medium
   },
   text: {
      color: '#BABABA',
      fontSize: 13,
      marginRight: 7,

   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '80%',
      marginTop: 10
   },
   card: {
      flexDirection: 'row',
      width: Dimensions.get('window').width * 0.5,
      borderRadius: 16,
      backgroundColor: Colors.YELLOW_PALE,
      height: 48,
      alignItems: 'center',
      paddingHorizontal: 18,
      justifyContent: 'space-between',
      marginTop: 28
   },
   textcard: {
      fontFamily: fontFamily.Medium,
      fontSize: 15,
      color: Colors.BLACK,
      width: 100
   },
   icon: {
      height: 20,
      width: 20,
      marginLeft: 3
   }
});