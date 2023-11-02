/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Contact from '../screens/lecturers/Contact';
import DetailContact from '../screens/lecturers/DetailContact';


type ContactProps = {};
type DetailContactProps = {
   email:string,
   name:string,
   phone:string
};


export type ContactStackParamList = {
    ContactInner: ContactProps | undefined;
    DetailContact: DetailContactProps | undefined;
};

const Stack = createStackNavigator<ContactStackParamList>();

const ContactStack = () => {
    return (
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ContactInner" component={Contact} />
                <Stack.Screen name="DetailContact" component={DetailContact} />
            </Stack.Navigator>
    );
};

export default ContactStack;