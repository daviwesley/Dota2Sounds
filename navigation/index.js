import { createStackNavigator, createAppContainer } from 'react-navigation';
import App from '../App';

const mainStack =  createStackNavigator({
    Home: {
        screen: App,
        headerLeft: null,
        navigationOptions: {
            title: 'Dota2Sounds',
            headerLeft: null,
        }
    },
})

export default createAppContainer(mainStack);
