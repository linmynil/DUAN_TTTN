

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,

} from 'react-native';
import { fontFamily } from './assets/fonts';
import { Colors} from './assets';
import { Header } from './src/component/Header';
import Report from './src/screens/staff/Report';
import { Button } from './src/component/Button';
import Login from './src/screens/lecturers/Login';
import Home from './src/screens/lecturers/Home';
import FormReport from './src/screens/lecturers/FormReport';
import StepsReport from './src/screens/lecturers/StepsReport';


function App(): JSX.Element {
  const [selectTab, setSelectTab] = useState(0);
  const [status, setstatus] = useState(true);
  const handleButton= () =>{
        setstatus(!status);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.black}>Huỳnh Thị Mỹ Linh </Text>
    <Text style={styles.bold}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.italic}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.light}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.medium}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.regular}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.thin}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.thin}>Huỳnh Thị Mỹ Linh  </Text> */}
      {/* đây là màn hình xem báo sự cố của nhân viên */}
     {/* <Login></Login> */}
     {/* <FormReport></FormReport> */}
    < StepsReport></StepsReport>
     {/* <Home></Home> */}
      {/* Sử dụng button truyền vào title và width, status chỉ truyền vào ở màn hình báo cáo sự cố */}
      {/* <Button status={status} title='Gửi yêu cầu' onPress={handleButton} viewStyle={{width:367}}></Button> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  black: {
    fontFamily: 'Roboto-Thin',
    fontSize: 25,
  },
  bold: {
    fontFamily: fontFamily.Bold,
    fontSize: 25
  },

  italic: {
    fontFamily: fontFamily.Italic,
    fontSize: 25
  },
  light: {
    fontFamily: fontFamily.Light,
    fontSize: 25
  },
  thin: {
    fontFamily: fontFamily.Thin,
    fontSize: 25
  },
  medium: {
    fontFamily: fontFamily.Medium,
    fontSize: 25
  },
  regular: {
    fontFamily: fontFamily.Regular,
    fontSize: 25
  },

});

export default App;
