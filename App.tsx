

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
 
} from 'react-native';
import { fontFamily } from './assets/fonts';

function App(): JSX.Element {
  
  return (
    <SafeAreaView >
    <Text style={styles.black}>Huỳnh Thị Mỹ Linh </Text>
    <Text style={styles.bold}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.extraLight}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.extraBold}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.italic}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.light}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.medium}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.regular}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.semibold}>Huỳnh Thị Mỹ Linh  </Text>
    <Text style={styles.thin}>Huỳnh Thị Mỹ Linh  </Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  black:{
    fontFamily:fontFamily.Black,
    fontSize:25,
    color:'black'
  },
  bold:{
    fontFamily:fontFamily.Bold,
    fontSize:25
  },
  extraLight:{
    fontFamily:fontFamily.ExtraLight,
    fontSize:25,
  },
  extraBold:{
    fontFamily:fontFamily.ExtraBold,
    fontSize:25
  },
  italic:{
    fontFamily:fontFamily.Italic,
    fontSize:25
  },
  light:{
    fontFamily:fontFamily.Light,
    fontSize:25
  },
  thin:{
    fontFamily:fontFamily.Thin,
    fontSize:25
  },
  medium:{
    fontFamily:fontFamily.Medium,
    fontSize:25
  },
  regular:{
    fontFamily:fontFamily.Regular,
    fontSize:25
  },
  semibold:{
    fontFamily:fontFamily.Semibold,
    fontSize:25
  }
});

export default App;
