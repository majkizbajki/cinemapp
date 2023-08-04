import {
    Keyboard,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useState } from 'react';
import { SearchBar } from '../../components/molecules';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { HomePageMoviesList } from '../../components/templates';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { MoviesList, Settings } from '../../components/organism';
import { useAppSelector } from '../../app/hooks';
import { selectSearchedMovies } from '../../app/services/movies/moviesSlice';

export const HomeScreen = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { t } = useTranslation();
    const { movies } = useAppSelector(selectSearchedMovies);

    const { colors } = useTheme();
    const style = styles(colors);

    const handleSettingsButton = () => {
        if (settingsButtonPosition.value) {
            settingsButtonPosition.value = withTiming(0, { duration: 250 });
            return;
        }
        settingsButtonPosition.value = withTiming(-128, { duration: 250 });
    };

    const settingsButtonPosition = useSharedValue(0);

    const settingsButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            ...style.settingsButton,
            right: settingsButtonPosition.value
        };
    });

    const toggleSheet = () => {
        setIsOpen(state => (state = !state));
    };

    return (
        <SafeAreaView style={style.screen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={style.headerContainer}>
                        <SearchBar
                            handlePress={state => {
                                setIsSearching(state);
                                handleSettingsButton();
                            }}
                        />
                        <Animated.View style={settingsButtonAnimatedStyle}>
                            <TouchableOpacity style={style.settingsButton} onPress={toggleSheet}>
                                <IoniconsIcon
                                    name="settings-outline"
                                    color={colors.primary}
                                    size={32}
                                />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    <HomePageMoviesList hide={isSearching} />
                    <MoviesList
                        hide={!isSearching}
                        size="large"
                        emptyListMessage={t('home.searchMessage')}
                        movies={movies}
                    />
                    {isOpen && <Settings toggleSheet={toggleSheet} />}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.background
        },
        container: {
            flex: 1
        },
        headerContainer: {
            paddingHorizontal: 16,
            marginBottom: 32,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
        },
        settingsButton: {
            width: 32,
            height: 32,
            borderRadius: 16,
            marginBottom: 8,
            marginRight: 16
        }
    });
