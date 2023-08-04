import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import tinycolor from 'tinycolor2';
import { useGetSearchedMoviesQuery } from '../../app/services/movies/moviesApi';

interface ISearchBarProps {
    handlePress: (state: boolean) => void;
}

export const SearchBar = ({ handlePress }: ISearchBarProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [requestQuery, setRequestQuery] = useState('');

    const { t } = useTranslation();

    useGetSearchedMoviesQuery(
        { page: 1, query: requestQuery },
        { refetchOnMountOrArgChange: true }
    );

    const { colors } = useTheme();
    const style = styles(colors);

    const width = useSharedValue(60);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            ...style.container,
            width: `${width.value}%`
        };
    });

    useEffect(() => {
        if (searchQuery) {
            const delayTimer = setTimeout(() => {
                setRequestQuery(searchQuery);
            }, 500);
            return () => {
                clearTimeout(delayTimer);
            };
        } else {
            const delayTimer = setTimeout(() => {
                setRequestQuery('');
            }, 0);
            return () => {
                clearTimeout(delayTimer);
            };
        }
    }, [searchQuery]);

    const handleSearchBarAnimation = (value: boolean) => {
        if (value) {
            setIsClicked(value);
            width.value = withTiming(100, { duration: 250 });
            handlePress(value);
            return;
        }

        setIsClicked(false);
        setRequestQuery(searchQuery);
        width.value = withTiming(60, { duration: 250 });
        handlePress(value);
    };

    return (
        <Animated.View style={animatedStyle}>
            <Surface elevation={1} style={style.surface}>
                {isClicked && (
                    <View style={style.button}>
                        <View style={style.searchContainer}>
                            <TouchableOpacity onPress={() => handleSearchBarAnimation(false)}>
                                <IoniconsIcon name="close" size={24} color={colors.primary} />
                            </TouchableOpacity>
                            <TextInput
                                style={style.search}
                                placeholder={t('home.searchMessage')}
                                placeholderTextColor={tinycolor(colors.primary)
                                    .setAlpha(0.6)
                                    .toRgbString()}
                                onChangeText={query => setSearchQuery(query)}
                            />
                        </View>
                        {/* 
                        
                        TODO: Add filters
                        
                        <View>
                            <IoniconsIcon name="options-outline" size={24} color={colors.primary} />
                        </View> */}
                    </View>
                )}
                {!isClicked && (
                    <TouchableOpacity
                        style={style.button}
                        onPress={() => handleSearchBarAnimation(true)}
                    >
                        <View style={style.searchContainer}>
                            <IoniconsIcon name="search" size={24} color={colors.primary} />
                            <TextInput
                                editable={false}
                                showSoftInputOnFocus={false}
                                style={style.search}
                                placeholder={t('home.search')}
                                placeholderTextColor={tinycolor(colors.primary)
                                    .setAlpha(0.6)
                                    .toRgbString()}
                                onPressIn={() => handleSearchBarAnimation(true)}
                            />
                        </View>
                        {/* 
                        
                        TODO: Add filters

                        <TouchableOpacity disabled>
                            <IoniconsIcon name="options-outline" size={24} color={colors.primary} />
                        </TouchableOpacity> */}
                    </TouchableOpacity>
                )}
            </Surface>
        </Animated.View>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            height: 48,
            marginTop: 32
        },
        surface: {
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.shadow
        },
        button: {
            height: 48,
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
        },
        search: {
            height: 48,
            marginLeft: 12,
            color: colors.primary,
            fontFamily: 'Poppins-Medium',
            marginTop: Platform.OS === 'android' ? 4 : undefined,
            flex: 1
        }
    });
