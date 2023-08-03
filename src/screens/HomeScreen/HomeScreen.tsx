import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import {
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery
} from '../../app/services/movies/moviesApi';

export const HomeScreen = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { themeMode, toggleTheme } = useContext(ThemeContext);

    useGetPopularMoviesQuery(1);
    useGetTopRatedMoviesQuery(1);
    useGetUpcomingMoviesQuery(1);

    return (
        <SafeAreaView>
            <Text variant="labelMedium">6.91/10</Text>
            <Text variant="labelLarge"># 1st place on the popularity card</Text>
            <Text variant="bodyMedium">Some description</Text>
            <Text variant="headlineSmall">Settings</Text>
            <Text variant="titleLarge">Now playing</Text>
            <Text variant="titleMedium">The flash</Text>
            <Text variant="bodyMedium">{themeMode}</Text>
            <Button title="Toggle theme" onPress={toggleTheme} />
            <Button
                title="Details Screen"
                onPress={() => navigate('DetailsScreen', { movieId: 298618 })}
            />
        </SafeAreaView>
    );
};
