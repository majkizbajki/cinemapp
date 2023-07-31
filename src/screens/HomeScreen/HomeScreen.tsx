import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView>
            <Text>Home</Text>
            <Button title="Details Screen" onPress={() => navigate('DetailsScreen')} />
        </SafeAreaView>
    );
};
