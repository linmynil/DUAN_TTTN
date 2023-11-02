/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import History from '../screens/lecturers/History';
import DetailHistory from '../screens/lecturers/DetailHistory';

type HistoryProps = {};
type DetailHistoryProps = {

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