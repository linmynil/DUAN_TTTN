/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/lecturers/Login';
import Home from '../screens/lecturers/Home';
import FormReport from '../screens/lecturers/FormReport';
import StepsReport from '../screens/lecturers/StepsReport';
import Report from '../screens/staff/Report';
import Detail from '../screens/staff/Detail';
import Register from '../screens/lecturers/Register';

type LoginProps={};
type HomeProps={
  role:number
};
type FormReportProps={};
type StepsReportProps={};
type ReportProps={};
type DetailProps={};
type RegisterProps={};

export type RootStackParamList = {
  Login: LoginProps|undefined;
  Register:RegisterProps|undefined;
  Home: HomeProps|undefined;
  FormReport: FormReportProps|undefined;
  StepsReport: StepsReportProps|undefined;
  Report: ReportProps|undefined;
  Detail: DetailProps|undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackHome = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator 
       initialRouteName="Login"
        screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
        <Stack.Screen name="FormReport" component={FormReport} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StepsReport" component={StepsReport} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Register" component={Register} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackHome;