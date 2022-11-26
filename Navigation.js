import React  from "react";
import { Button, StyleSheet, Text} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator,  DrawerContentScrollView,DrawerItemList,DrawerItem} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign, FontAwesome5, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { auth } from "./firebaseConfig";

//screens
import SplashScreen from './screens/SplashScreen';
import Login_RegisterScreen from './screens/Login_RegisterScreenn';
import HomeScreen from './screens/HomeScreen';
import ItinerarioScreen  from "./screens/ItinerarioScreen";
import Vrplayer from "./screens/Vrplayer";
import ActividadScreen from "./screens/ActividadScreen";
import Quienesomos from "./screens/quienessomos";
import Colabora from "./screens/Colabora";
import RedesSociales from "./screens/RedesSociales";
import TriviahomeScreen from "./screens/triviascreens/Triviahomescreen";
import QuizScreen from "./screens/triviascreens/QuizScreen";
import ResultsScreen from "./screens/triviascreens/ResultScreen";

const Tab = createBottomTabNavigator();
const StackNavigator = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function TriviaStack(){
    return(
        <StackNavigator.Navigator>
            <StackNavigator.Screen name="triviahome" component={TriviahomeScreen} options={{headerShown: false}}/>
            <StackNavigator.Screen name="Quiz" component={QuizScreen} options={{headerShown: false}}/>
            <StackNavigator.Screen name="Result" component={ResultsScreen} options={{headerShown: false}}/>
        </StackNavigator.Navigator>
    )
}

function MyTabs() {
    return(
        <Tab.Navigator initialRouteName="hometab" screenOptions={{tabBarActiveTintColor: '#EF662F', tabBarShowLabel: false, 
        tabBarStyle:{backgroundColor:'white', position:'absolute', bottom:30, marginHorizontal:20, height:60, borderRadius: 10, shadowColor:'#000', shadowOpacity:0.06, shadowOffset:{width:10, height:10}}}}>
            <Tab.Screen name="vr" component={Vrplayer} 
            options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="vr-cardboard" size={size} color={color} style={{position:'absolute', top:'50%'}} />
            )}}/>
            <Tab.Screen name="Trivia" component={TriviaStack}
             options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="gamepad-square" size={24} color="black" style={{position:'absolute', top: '50%'}} />
            )}}/>
            <Tab.Screen name="hometab" component={HomeScreen} 
            options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} style={{position:'absolute', top:'50%'}}/>
            )}}/>
            <Tab.Screen name="Itinerario" component={ItinerarioScreen}
             options={{ headerShown: false, tabBarIcon: ({ color,size }) => (
                <FontAwesome name="list-alt" size={28} color={color} style={{position:'absolute', top:'50%'}} />
            )}}/>
        </Tab.Navigator>
    )
}
function CustomDrawerContent(props) {
    const navigation = useNavigation()
    const handleSignout = () => {
        auth
        .signOut()
        .then(() => {
          navigation.replace('Login')
        })
        .catch(error => alert(error.message))
      }
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Sign out" onPress={handleSignout}/>
      </DrawerContentScrollView>
    );
  }
function MyDrawer(){
    return(
        <Drawer.Navigator initialRouteName="Principal" screenOptions={{ headerShown: false, drawerActiveTintColor:'#EF662F'}} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Principal" component={MyTabs}/>
            <Drawer.Screen name="Acerca de Turingo" component={Quienesomos}/>
            <Drawer.Screen name="Colabora con Nosotros" component={Colabora}/>
            <Drawer.Screen name="Síguenos en Nuestras Redes" component={RedesSociales}/>
        </Drawer.Navigator>
    )
}

function MyStack() {
    return(
        <StackNavigator.Navigator initialRouteName="SplashScreen" >
            <StackNavigator.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
             <StackNavigator.Screen name='Login' component={Login_RegisterScreen} options={{headerShown: false}}/>
             <StackNavigator.Screen name='Home' component={MyDrawer} options={{headerShown: false}}/>
             <StackNavigator.Screen name='Actividad' component={ActividadScreen} options={{headerShown: false}}/>
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