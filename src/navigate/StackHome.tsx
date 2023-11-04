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

type HomeProps = {
  role: number
  id: string
  name: string
};
type FormReportProps = {
  id: string,
  name: string
};
type StepsReportProps = {};
type ReportProps = {
  id: string,
  name: string
};
type DetailProps = {
  name: string,
  phone: string,
  avatar: string,
  time: string,
  room: string,
  description: string,
  id:string,
  step_two_status:boolean,
  step_three_status:boolean,
  category: string;
};
type RegisterProps = {};

export type RootStackParamList = {
  HomeInner: HomeProps | undefined;
  FormReport: FormReportProps | undefined;
  StepsReport: StepsReportProps | undefined;
  Report: ReportProps | undefined;
  Detail: DetailProps | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeInner"
      screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
      <Stack.Screen name="FormReport" component={FormReport} />
      <Stack.Screen name="HomeInner" component={Home} />
      <Stack.Screen name="StepsReport" component={StepsReport} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="Detail" component={Detail} />

    </Stack.Navigator>
  );
};

export default StackHome;