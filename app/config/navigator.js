import { createAppContainer, createStackNavigator } from 'react-navigation';
import Grouppage from '../components/grouppage';
import Gympage from '../components/gympage';
import Homepage from '../components/homepage';

const AppNavigator = createStackNavigator({
    Homepage: {
      screen: Homepage,
    },
    Grouppage: {
      screen: Grouppage,
    },
    Gympage: {
        screen: Gympage,
      },
  }, {
      initialRouteName: 'Homepage',
  });

export default AppContainer = createAppContainer(AppNavigator);