import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

} from 'react-native';
import { Header } from '../../component/Header';
import { Colors, fontFamily } from '../../../assets';



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
             
          </View>
          ):(
          <View style={styles.tab}>
  
          </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
  

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24
  },
  switchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:17,
    height:'100%',
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
  tab:{
    width: '100%',
    height:'90%',
    marginTop:35
  }

});

export default Report;
