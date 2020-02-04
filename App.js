import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import SearchQuoteScreen from './screens/SearchQuoteScreen';
import RegisterScreen from './screens/RegisterScreen';

const Router = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    SearchQuote: SearchQuoteScreen,
    Dashboard: DashboardScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

const App = createAppContainer(Router);

export default App;