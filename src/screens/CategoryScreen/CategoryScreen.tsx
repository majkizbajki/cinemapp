import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { MoviesList } from '../../components/organism';
import { useAppSelector } from '../../app/hooks';
import {
    selectNowPlayingMovies,
    selectPopularMovies,
    selectTopRatedMovies,
    selectUpcomingMovies
} from '../../app/services/movies/moviesSlice';
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery
} from '../../app/services/movies/moviesApi';
import { useState } from 'react';

export const CategoryScreen = () => {
    const { t } = useTranslation();
    const { goBack } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { params } = useRoute<RouteProp<RootStackParamList, 'CategoryScreen'>>();

    const { movies, loadedPages } = useAppSelector(getSelector());

    const [page, setPage] = useState(loadedPages);

    useGetNowPlayingMoviesQuery(page, {
        skip: params.category !== 'nowPlaying' && page <= loadedPages
    });
    useGetPopularMoviesQuery(page, { skip: params.category !== 'popular' && page <= loadedPages });
    useGetTopRatedMoviesQuery(page, {
        skip: params.category !== 'topRated' && page <= loadedPages
    });
    useGetUpcomingMoviesQuery(page, {
        skip: params.category !== 'upcoming' && page <= loadedPages
    });

    const { colors } = useTheme();
    const style = styles(colors);

    function getSelector() {
        if (params.category === 'nowPlaying') {
            return selectNowPlayingMovies;
        }
        if (params.category === 'popular') {
            return selectPopularMovies;
        }
        if (params.category === 'topRated') {
            return selectTopRatedMovies;
        }
        return selectUpcomingMovies;
    }

    return (
        <SafeAreaView style={style.screen}>
            <View style={style.headerContainer}>
                <TouchableOpacity style={style.headerButton} onPress={() => goBack()}>
                    <AntDesignIcon name="arrowleft" color={colors.primary} size={32} />
                </TouchableOpacity>
                <Text variant="titleLarge" style={style.header}>
                    {t(`home.${params.category}`)}
                </Text>
            </View>
            <MoviesList
                size="large"
                handleLoadMoreMovies={() => setPage(loadedPages + 1)}
                movies={movies}
            />
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.background
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 16
        },
        headerButton: {
            width: 64,
            height: 64,
            borderRadius: 32,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 16
        },
        header: {
            color: colors.primary,
            marginRight: 32
        }
    });
