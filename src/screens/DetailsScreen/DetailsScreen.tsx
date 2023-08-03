import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoviesList } from '../../components/organism';

export const DetailsScreen = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView>
            <Text>Details</Text>
            <MoviesList />
            <Button title="Home Screen" onPress={() => navigate('MainScreen')} />
        </SafeAreaView>
    );
};
