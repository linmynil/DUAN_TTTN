/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */


import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,

} from 'react-native';
import { fontFamily } from './assets/fonts';
import { Colors } from './assets';
import { Header } from './src/component/Header';
import Report from './src/screens/staff/Report';
import { Button } from './src/component/Button';
import Detail from './src/screens/staff/Detail';
import Home from './src/screens/lecturers/Home';
import StackHome from './src/navigate/StackHome';

function App(): JSX.Element {
  const [selectTab, setSelectTab] = useState(0);
  const [status, setstatus] = useState(true);
  const handleButton = () => {
    setstatus(!status);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StackHome></StackHome>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },

});

export default App;
