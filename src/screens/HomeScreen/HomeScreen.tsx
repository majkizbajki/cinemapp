import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

export const HomeScreen = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView>
            <Text variant="labelMedium">6.91/10</Text>
            <Text variant="labelLarge"># 1st place on the popularity card</Text>
            <Text variant="bodyMedium">Some description</Text>
            <Text variant="headlineSmall">Settings</Text>
            <Text variant="titleLarge">Now playing</Text>
            <Text variant="titleMedium">The flash</Text>
            <Button title="Details Screen" onPress={() => navigate('DetailsScreen')} />
        </SafeAreaView>
    );
};
