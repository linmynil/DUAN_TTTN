// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import React from 'react';
// import Home from '../screens/lecturers/Home';
// import FormReport from '../screens/lecturers/FormReport';
// import StepsReport from '../screens/lecturers/StepsReport';

// type SettingProps={}
// type HomeProps = {};
// type FormReportProps={};
// type StepsReportProps={};
// type HistoryStack = {}
// type ContactStack = {}
// type HomeStack = {
//   Home: HomeProps|undefined;
//   FormReport: FormReportProps|undefined;
//   StepsReport:StepsReportProps|undefined;
// };

// type ProfileStackParamList = {
//   Profile: undefined;
// };
// export type TabNavigator = {
//     Setting: SettingProps | undefined;
//     History: HistoryStack | undefined;
//     Contact: ContactStack | undefined;
//     Home: HomeStack|undefined;
// }

// const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="FormReport" component={FormReport} />
//       <Stack.Screen name="StepsReport" component={StepsReport} />
//     </Stack.Navigator>
//   );
// };

// // const ProfileStack = () => {
// //   return (
// //     <Stack.Navigator>
// //       <Stack.Screen name="Profile" component={ProfileScreen} />
// //     </Stack.Navigator>
// //   );
// // };

// const Tab = createBottomTabNavigator<TabNavigator>();
// const Stack = createStackNavigator<HomeStack>();
// const _TabNavigator = () => {
//     return(
//         <Tab.Navigator 
//         screenOptions={{
//             headerShown: false,
//         }}>
//         <Tab.Screen name="Home" component={HomeStack} />
//         {/* <Tab.Screen name="Profile" component={Profile} />
//         <Tab.Screen name="Mytrip" component={Mytrip} />
//         <Tab.Screen name="WishList" component={WishList} /> */}
//       </Tab.Navigator>
//     );
// }

// export const TabNavigator = React.memo(_TabNavigator);

