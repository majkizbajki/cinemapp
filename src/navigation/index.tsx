import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CategoryScreenTypes } from './types';
import { CategoryScreen } from '../screens/CategoryScreen';

export type RootStackParamList = {
    MainScreen: undefined;
    DetailsScreen: {
        movieId: number;
    };
    CategoryScreen: {
        category: CategoryScreenTypes;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="MainScreen"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="MainScreen" component={HomeScreen} />
                    <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
                    <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};
