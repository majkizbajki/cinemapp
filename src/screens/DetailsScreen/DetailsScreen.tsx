import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { Text, useTheme } from 'react-native-paper';
import Config from 'react-native-config';
import tinycolor from 'tinycolor2';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { ElevatedButton } from '../../components/atoms';
import { useGetMovieDetailsQuery } from '../../app/services/movies/moviesApi';
import { useCheckMovieRank } from '../../hooks';
import { MovieDetails } from '../../components/molecules';
import { ErrorScreen } from '../../components/templates';

const CONTENT_CONTAINER_RADIUS = 32;
const BUTTON_CONTAINER_SIZE = 48;

export const DetailsScreen = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { params } = useRoute<RouteProp<RootStackParamList, 'DetailsScreen'>>();

    const { data, isError, isLoading } = useGetMovieDetailsQuery(params.movieId);
    const { rank } = useCheckMovieRank(params.movieId);

    const { colors } = useTheme();
    const { themeMode } = useContext(ThemeContext);
    const style = styles(colors);

    return (
        <SafeAreaView style={style.screen}>
            {isError && (
                <ErrorScreen errorMessage="Error occurred" onPress={() => navigate('MainScreen')} />
            )}
            {data && (
                <>
                    <View style={style.imageContainer}>
                        <Image
                            source={{ uri: `${Config.IMAGES_URL + data.backdropPath}` }}
                            style={style.image}
                        />
                    </View>
                    <ElevatedButton
                        elevation={3}
                        buttonStyle={style.button}
                        buttonSurfaceStyle={style.buttonSurface}
                        onPress={() => navigate('MainScreen')}
                    >
                        <AntDesignIcon
                            name="arrowleft"
                            color={themeMode === 'dark' ? colors.primary : colors.background}
                            size={28}
                        />
                    </ElevatedButton>
                    <View style={style.contentContainer}>
                        {rank && (
                            <Text style={style.rank} variant="labelSmall">
                                {rank}
                            </Text>
                        )}
                        <MovieDetails
                            genres={data.genres}
                            isRank={Boolean(rank)}
                            overview={data.overview}
                            productionCountries={data.productionCountries}
                            title={data.title}
                            voteAverage={data.voteAverage}
                            voteCount={data.voteCount}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: colors.background
        },
        imageContainer: {
            width: '100%',
            position: 'absolute',
            height: 320 + 2 * CONTENT_CONTAINER_RADIUS + BUTTON_CONTAINER_SIZE // 320 + 2 * border radius + buttonContainer height
        },
        image: {
            flex: 1
        },
        buttonSurface: {
            width: BUTTON_CONTAINER_SIZE,
            height: BUTTON_CONTAINER_SIZE,
            backgroundColor: tinycolor('#ffffff').setAlpha(0.1).toRgbString(),
            borderRadius: BUTTON_CONTAINER_SIZE / 2,
            marginLeft: 16,
            marginTop: 16
        },
        button: {
            flex: 1,
            borderRadius: BUTTON_CONTAINER_SIZE / 2,
            alignItems: 'center',
            justifyContent: 'center'
        },
        contentContainer: {
            flex: 0.65,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            backgroundColor: colors.background
        },
        rank: {
            color: colors.primary,
            marginLeft: 32,
            marginTop: 16
        }
    });
