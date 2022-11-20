import React  from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AntDesign } from '@expo/vector-icons'; 

//screens
import SplashScreen from './screens/SplashScreen';
import Login_RegisterScreen from './screens/Login_RegisterScreenn';
import HomeScreen from './screens/HomeScreen';
import GustosScreen  from "./screens/GustosScreen";

const Tab = createBottomTabNavigator();
const StackNavigator = createNativeStackNavigator();

function MyTabs() {
    return(
        <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#EF662F'}}>
            <Tab.Screen name="hometab" component={HomeScreen} 
            options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
            )}}/>
            <Tab.Screen name="Favoritos" component={GustosScreen}
             options={{ headerShown: false, tabBarIcon: ({ color }) => (
                <AntDesign name="hearto" size={20} color={color} />
            )}}/>
        </Tab.Navigator>
    )
}

function MyStack() {
    return(
        <StackNavigator.Navigator initialRouteName="SplashScreen" >
            <StackNavigator.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
             <StackNavigator.Screen name='Login' component={Login_RegisterScreen} options={{headerShown: false}}/>
             <StackNavigator.Screen name='Home' component={MyTabs} options={{headerShown: false}}/>
        </StackNavigator.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}