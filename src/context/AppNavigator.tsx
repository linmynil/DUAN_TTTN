import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackHome from '../navigate/StackHome';
import HistoryStack from '../navigate/HistoryStack';
import ContactStack from '../navigate/ContactStack';
import Setting from '../screens/lecturers/Setting';
import Login from '../screens/lecturers/Login';
import { AppContext } from './AppCotext';
import {
    Image, StyleSheet,
} from 'react-native';
import { Colors, HISTORY, HISTORY_CLICK, HOME, HOME_CLICK, PHONE, PHONE_CLICK, SETTING, SETTING_CLICK, fontFamily } from '../../assets';

export type TabParamList = {
    Home: undefined;
    History: undefined;
    Contact: undefined;
    Setting: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<TabParamList>();

const Users = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    );
};

const Main = () => {
    const appContext = useContext(AppContext);

    if (!appContext) {
        // Xử lý khi không có giá trị trong AppContext
        return null;
    }

    const { isLogin, infoUser } = appContext;
    const role = infoUser.role as number;
    // Lấy giá trị role từ infoUser


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconSource;
                    if (route.name === 'Home') {
                        iconSource = focused ? HOME_CLICK : HOME;
                    } else if (route.name === 'History') {
                        iconSource = focused ? HISTORY_CLICK : HISTORY;
                    } else if (route.name === 'Contact') {
                        iconSource = focused ? PHONE_CLICK : PHONE;
                    } else if (route.name === 'Setting') {
                        iconSource = focused ? SETTING_CLICK : SETTING;
                    }

                    return (
                        <Image
                            source={iconSource}
                            style={[
                                styles.tabIcon,
                                focused && styles.tabIconFocused,
                            ]}
                            resizeMode="contain"
                        />
                    );
                },
                tabBarActiveTintColor: Colors.YELLOW,
                tabBarInactiveTintColor: Colors.GRAY_BOTTOM,
                tabBarLabelStyle: {
                    marginBottom: 10,
                    fontSize: 12,
                    fontFamily: fontFamily.Bold,
                },
                tabBarStyle: {
                    height: 70,
                    paddingVertical: 15// Chỉnh chiều cao ở đây
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={StackHome} />
            <Tab.Screen name="History" component={HistoryStack} />
            {role !== 1 && (
                <Tab.Screen name="Contact" component={ContactStack} />
            )}
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    );
};
const styles = StyleSheet.create({
    tabIcon: {
        width: 20,
        height: 20,
    },
    tabIconFocused: {
        transform: [
            { translateY: -10 }, // Di chuyển lên trên 10 đơn vị
        ],
    }
});

const AppNavigator = () => {
    const appContext = useContext(AppContext);

    if (!appContext) {
        // Xử lý khi không có giá trị trong AppContext
        return null;
    }

    const { isLogin, infoUser } = appContext;
    const role = infoUser.role;
    return (
        <>
            {isLogin === false ? <Users /> : <Main />}
        </>
    );
};

export default AppNavigator;