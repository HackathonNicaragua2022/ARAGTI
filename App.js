import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons'
import SplashScreen from './screens/SplashScreen';
import Login_RegisterScreen from './screens/Login_RegisterScreenn';
import HomeScreen from './screens/HomeScreen';
import GustosScreen  from "./screens/GustosScreen";

// Este archivo se podría decir que es el panel de control principal pues desde este se montan todas las pantallas


const HomeAppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Favoritos: GustosScreen ,

}, {defaultNavigationOptions: ({ navigation}) => ({
  tabBarIcon: ({ focused, horizontal, tintColor})=>{
    const { routeName } = navigation.state
    let iconName 
    if (routeName == 'Home'){
      iconName = `home-outline`
    } else{
      iconName = `heart-outline`
    }

    return <Ionicons name={iconName} size = {20} color={"#EF662F"}/>
  },
  tabBarOptions:{
    activeTintColor: "#EF662F"
  }
})})


const AppNavigator1 = createSwitchNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions:{
      headerShown: false,
    }
  },
  
  Login: {
    screen: Login_RegisterScreen,
    navigationOptions:{
      headerShown:false,
    }
  },
  Home: {
    screen: HomeAppNavigator,
  }
},{initialRouteName: 'Splash'}
)



export default createAppContainer(AppNavigator1)
