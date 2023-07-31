import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type RootStackParamList = {
    MainScreen: undefined;
    DetailsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="MainScreen" component={HomeScreen} />
                    <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};
