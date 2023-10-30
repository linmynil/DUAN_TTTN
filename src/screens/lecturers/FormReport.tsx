/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, StatusBar, Alert, ToastAndroid, Pressable, ImageSourcePropType, Dimensions } from 'react-native';
import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Header } from '../../component/Header';
import { CAMERA, Colors, PICTURE, fontFamily } from '../../../assets';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button } from '../../component/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigate/StackHome';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { launchImageLibrary, launchCamera, Asset } from 'react-native-image-picker';
import { FlatList } from 'react-native-gesture-handler';
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

type ItemData = {
   id: string;
   image: string;
};


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
   const [dataImage, setDataImage] = useState<ItemData[]>([]);
   const [images, setImages] = useState<string>('');
   const addData = (sourceImage: string) => {
      const newItem: ItemData = {
         id: Math.random().toString(),
         image: sourceImage,
      };
      setDataImage([...dataImage, newItem]);
      console.log('=>>>', dataImage.length)

   };

   const handleButton = () => {
      setstatus(status);
      navigation.navigate('StepsReport');
   };

   const handleSelectCategory = (value: string) => {
      const category = data.find((item) => item.key === value);
      setSelectedCategory(category || null);
      setSelected(value);
   };

   const handleCameraPhoto = useCallback(async () => {
      const options: any = {
         saveToPhotos: true,
         mediaType: 'photo',
         includeBase64: false,
         includeExtra: true,
      };

      const response: any = await new Promise((resolve) => {
         launchCamera(options, (res) => {
            resolve(res);
            // console.log(res);
         });
      });

      if (response.didCancel) {
         console.log('Cancel pick image');
      } else if (response.error) {
         console.log('image picker error: ', response.error);
      } else if (response.customButton) {
         console.log('tap button: ', response.customButton);
      } else {
         const selectedImage: Asset = response.assets[0];
         const formData = new FormData();

         formData.append('image', {
            uri: selectedImage.uri,
            type: selectedImage.type,
            name: selectedImage.fileName,
         }
         );

         const fetchData = async () => {
            const url = `http://192.168.1.17:3000/report/uploadimages`;
            const res = await fetch(url, {
               method: 'POST',
               headers: {
                  // Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
               },
               body: formData,
            });
            const data = await res.json();
            return data;
         };

         const res = await fetchData();
         // console.log(res);
         // console.log(res.link);
         addData(res.link)
         setImages(res.link)
      }
   }, []);
   console.log(dataImage.length);
   const handleChoosePhoto = useCallback(async () => {
      const options: any = {
         saveToPhotos: true,
         mediaType: 'photo',
         includeBase64: false,
         includeExtra: true,
      };

      const response: any = await new Promise((resolve) => {
         launchImageLibrary(options, (res) => {
            resolve(res);
            // console.log(res);
         });
      });

      if (response.didCancel) {
         console.log('Cancel pick image');
      } else if (response.error) {
         console.log('image picker error: ', response.error);
      } else if (response.customButton) {
         console.log('tap button: ', response.customButton);
      } else {
         const selectedImage: Asset = response.assets[0];
         const formData = new FormData();

         formData.append('image', {

            uri: selectedImage.uri,
            type: selectedImage.type,
            name: selectedImage.fileName,
         }
         );
         console.log(formData);

         const fetchData = async () => {
            const url = `http://192.168.1.17:3000/report/uploadimages`;
            const res = await fetch(url, {
               method: 'POST',
               headers: {
                  // Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
               },
               body: formData,
            });
            const data = await res.json();
            return data;
         };

         const res = await fetchData();
         console.log(res);
         console.log(res.link);
         addData(res.link)
      }
   }, []);

   const renderItem = ({ item }: { item: ItemData }) => (
      <View style={styles.item} >
         <Image source={{ uri: item.image }} style={styles.image} />
      </View>

   );


   const handleAddReports = async () => {

      try {
         console.log('=>>>', dataImage.map((item: ItemData) => item.image));
         console.log('=>>>', selectedCategory?.value || '');
         console.log('=>>>', images);

         const imageUploadPromises = dataImage.map(async (item: ItemData) => {
            const formData = new FormData();
            formData.append('image', {
              uri: item.image,
              type: 'image/jpeg', // Thay thế bằng kiểu ảnh tương ứng
              name: 'image.jpg', // Thay thế bằng tên tệp tin ảnh tương ứng
            });
      
            const response = await axios.post('http://192.168.1.11:3000/report/uploadimages', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            return response.data.link;
          });
      
          const uploadedImageLinks = await Promise.all(imageUploadPromises)
          console.log(uploadedImageLinks)
         const response = await axios.post("http:192.168.1.11:3000/report/add_report", {
            room: room,
            description: description,
            category: selectedCategory?.value || '',
            name: name,
            image: images,

         });
         ToastAndroid.show('Add report Success', ToastAndroid.SHORT);
      } catch (error) {
         console.error(error);
         ToastAndroid.show('Add report Failed', ToastAndroid.SHORT);
      }
   };
   return dataImage.length == 0 ? (
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
               <Pressable onPress={handleCameraPhoto}>
                  <Image
                     source={CAMERA} />
               </Pressable>
            </View>
            <View style={styles.imagesLibrary}>
               <Pressable onPress={handleChoosePhoto}>
                  <Image
                     source={PICTURE} />
               </Pressable>
            </View>
         </View>

         <Button status={status} title='Gửi yêu cầu' onPress={() => { handleAddReports() }} viewStyle={{ width: '100%', marginTop: 16 }}></Button>
      </SafeAreaView>
   ) : (
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
               <Pressable onPress={handleCameraPhoto}>
                  <Image
                     source={CAMERA} />
               </Pressable>
            </View>
            <View style={styles.imagesLibrary}>
               <Pressable onPress={handleChoosePhoto}>
                  <Image
                     source={PICTURE} />
               </Pressable>
            </View>
         </View>
         <FlatList
            style={{ height: 100, width: Dimensions.get('window').width * 1 }}
            horizontal
            // numColumns={3}
            data={dataImage}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
         />
         <Button status={status} title='Gửi yêu cầu' onPress={() => { handleAddReports() }} viewStyle={{ width: '100%' }}></Button>
      </SafeAreaView>
   )

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
   item: {
      width: Dimensions.get('window').width * 0.27,
      margin: 5,
      height: 100,
      flexDirection: 'row',
   },
   image: {
      width: Dimensions.get('window').width * 0.27,
      height: 100,
   }
});