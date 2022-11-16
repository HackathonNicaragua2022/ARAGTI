import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator} from 'react-navigation-tabs';
import SplashScreen from './screens/SplashScreen';
import Login_RegisterScreen from './screens/Login_RegisterScreenn';
import HomeScreen from './screens/HomeScreen';
import GustosScreen  from "./screens/GustosScreen";


const HomeAppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Gustos: GustosScreen ,

})


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
},{initialRouteName: 'Login'}
)



export default createAppContainer(AppNavigator1)
