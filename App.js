import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons'
import SplashScreen from './screens/SplashScreen';
import Login_RegisterScreen from './screens/Login_RegisterScreenn';
import HomeScreen from './screens/HomeScreen';
import GustosScreen  from "./screens/GustosScreen";


const HomeAppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Gustos: GustosScreen ,

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
},{initialRouteName: 'Home'}
)



export default createAppContainer(AppNavigator1)
