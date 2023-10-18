import React, { useState } from 'react';
import { BackHandler, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image }
  from 'react-native';
import { Header } from '../../component/Header';
import { Colors, EDIT, ELLIPSE, HOME, HOME_CLICK, INTERNET, MANAGER, NOTIFICATION, SETTING, STATUS, fontFamily } from '../../../assets'


const Report: React.FC = () => {
  const [selectTab, setSelectTab] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <Header title='Sự cố '></Header>
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
          <View style={styles.tab}>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.GRAY, height: 100, width: 360, top: -10,  borderRadius: 8 }]}>
              <Text style={[styles.text, { textDecorationColor: Colors.BLACK, height: 23.23, width: 169.98, top: 21, right: 60, fontSize: 16, alignContent: 'center', lineHeight: 16 }]}>Sự cố máy chiếu hỏng</Text>
              <View>
                <Image style={styles.icon} source={ELLIPSE}  ></Image>

                <TouchableOpacity >
                  <Text style={[styles.text, { right: 60, top: 1 }]}>Lê Văn Hiếu</Text>
                  <View>
                    <Text style={[styles.text, { right: 60, top: 19 }]}>T1103</Text>
                    <Text style={[styles.text, { left: 10, top: -2 }]}>09:45am</Text>
                    <Text style={[styles.text, { left: 90, top: -22 }]}>17/02/2023</Text>
                  </View>

                </TouchableOpacity>
              </View>

            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.GRAY, height: 100, width: 360, top: 10,  borderRadius: 8 }]}>
              <Text style={[styles.text, { textDecorationColor: Colors.BLACK, height: 23.23, width: 169.98, top: 21, right: 60, fontSize: 16, alignContent: 'center', lineHeight: 16 }]}>Sự cố máy chiếu hỏng</Text>
              <View>
                <Image style={styles.icon} source={ELLIPSE}  ></Image>
                <TouchableOpacity >
                  <Text style={[styles.text, { right: 60, top: 1 }]}>Lê Văn Hiếu</Text>
                  <View>
                    <Text style={[styles.text, { right: 60, top: 19 }]}>T1103</Text>
                    <Text style={[styles.text, { left: 10, top: -2 }]}>09:45am</Text>
                    <Text style={[styles.text, { left: 90, top: -22 }]}>17/02/2023</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.GRAY, height: 100, width: 360, top: 30, borderRadius: 8 }]}>
              <Text style={[styles.text, { textDecorationColor: Colors.BLACK, height: 23.23, width: 169.98, top: 21, right: 60, fontSize: 16, alignContent: 'center', lineHeight: 16 }]}>Sự cố máy chiếu hỏng</Text>
              <View>
                <Image style={styles.icon} source={ELLIPSE}  ></Image>
                <TouchableOpacity >
                  <Text style={[styles.text, { right: 60, top: 1 }]}>Lê Văn Hiếu</Text>
                  <View>
                    <Text style={[styles.text, { right: 60, top: 19 }]}>T1103</Text>
                    <Text style={[styles.text, { left: 10, top: -2 }]}>09:45am</Text>
                    <Text style={[styles.text, { left: 90, top: -22 }]}>17/02/2023</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.GRAY, height: 100, width: 360, top: 50,  borderRadius: 8 }]}>
              <Text style={[styles.text, { textDecorationColor: Colors.BLACK, height: 23.23, width: 169.98, top: 21, right: 60, fontSize: 16, alignContent: 'center', lineHeight: 16 }]}>Sự cố máy chiếu hỏng</Text>
              <View>
                <Image style={styles.icon} source={ELLIPSE}  ></Image>
                <TouchableOpacity >
                  <Text style={[styles.text, { right: 60, top: 1 }]}>Lê Văn Hiếu</Text>
                  <View>
                    <Text style={[styles.text, { right: 60, top: 19 }]}>T1103</Text>
                    <Text style={[styles.text, { left: 10, top: -2 }]}>09:45am</Text>
                    <Text style={[styles.text, { left: 90, top: -22 }]}>17/02/2023</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.button2}>
                <Image style={styles.icon1} source={HOME_CLICK}  ></Image>
             <Text style={styles.test1}>Trang chủ</Text>
             <View>
              <Image style={styles.icon2} source={STATUS}  ></Image>
             </View>
             <View>
              <Image style={styles.icon3} source={SETTING}  ></Image>
             </View>


            </View>
          </View>
        ) : (
          <View style={styles.tab}>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.GRAY, height: 100, width: 360, top: 30,  borderRadius: 8 }]}>
              <Text style={[styles.text, { textDecorationColor: Colors.BLACK, height: 23.23, width: 169.98, top: 21, right: 60, fontSize: 16, alignContent: 'center', lineHeight: 16 }]}>Sự cố máy chiếu hỏng</Text>
              <View>
                <Image style={styles.icon} source={ELLIPSE}  ></Image>
                <TouchableOpacity >
                  <Text style={[styles.text, { right: 60, top: 1 }]}>Lê Văn Hiếu</Text>
                  <View>
                    <Text style={[styles.text, { right: 60, top: 19 }]}>T1103</Text>
                    <Text style={[styles.text, { left: 10, top: -2 }]}>09:45am</Text>
                    <Text style={[styles.text, { left: 90, top: -22 }]}>17/02/2023</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            
             <View style={styles.button1}>
                <Image style={styles.icon1} source={HOME_CLICK}  ></Image>
             <Text style={styles.test1}>Trang chủ</Text>
             <View>
              <Image style={styles.icon2} source={STATUS}  ></Image>
             </View>
             <View>
              <Image style={styles.icon3} source={SETTING}  ></Image>
             </View>


            </View>

          </View>
          
        )}


      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create( {
  button2:{
    width: 700,
    height: 55,
    top:110,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon3:{
    height: 22,
    width: 23,
    top: -29,
    right: 70,
  },
  icon2:{
    height: 22,
    width: 60,
    top: -9,
    right: 180,
  },
    test1:{
    fontSize: 12,
    fontFamily: fontFamily.Bold,
    height: 22,
    width: 70,
    top: 32,
    right: 270,
  },
  icon1: {
    height: 22,
    width: 23,
    top: 32,
    right: 280,

  },
  button1: {
    width: 700,
    height: 55,
    top:410,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 24
  },
  switchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17,
    height: '100%',
  },
  bordertab: {
    width: '100%',

    height: 56,
    borderColor: Colors.YELLOW,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    height: 55,
    backgroundColor: Colors.YELLOW,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: fontFamily.Bold
  },
  tab: {
    width: '100%',
    height: '90%',
    marginTop: 35
  },
  icon: {
    height: 20,
    width: 18,
    top: 35,
    right: 100,

  }
  

});

export default Report;
