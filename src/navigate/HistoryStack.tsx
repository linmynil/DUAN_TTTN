/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import History from '../screens/lecturers/History';
import DetailHistory from '../screens/lecturers/DetailHistory';

type HistoryProps = {};
type DetailHistoryProps = {
    description:string,
    name_staff:string,
    phone_staff:string,
    avatar_staff:string,
    step_two_time:string,
    step_three_time:string,
    step_two_status:boolean,
    step_three_status:boolean,
    room:string,
    time:string
};


export type HistoryStackParamList = {
    HistoryInner: HistoryProps | undefined;
    DetailHistory: DetailHistoryProps | undefined;
};

const Stack = createStackNavigator<HistoryStackParamList>();

const HistoryStack = () => {
    return (
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HistoryInner" component={History} />
                <Stack.Screen name="DetailHistory" component={DetailHistory} />

            </Stack.Navigator>
    );
};

export default HistoryStack;