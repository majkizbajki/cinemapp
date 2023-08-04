import React, { useCallback } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ListRenderItem,
    TouchableOpacity
} from 'react-native';
import { IMovie } from '../../app/services/movies/types';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { MovieTile, MovieTileSize } from '../molecules';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import { CategoryScreenTypes } from '../../navigation/types';

interface IMovieListProps {
    size: MovieTileSize;
    category?: CategoryScreenTypes;
    emptyListMessage?: string;
    hide?: boolean;
    horizontal?: boolean;
    label?: string;
    movies?: IMovie[];
    handleLoadMoreMovies?: () => void;
}

export const MoviesList = React.memo(
    ({
        size,
        category,
        emptyListMessage,
        hide,
        horizontal,
        label,
        movies,
        handleLoadMoreMovies
    }: IMovieListProps) => {
        const { t } = useTranslation();
        const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

        const { colors } = useTheme();
        const style = styles(colors);

        const renderMovieItem: ListRenderItem<IMovie> = useCallback(
            ({ item }) => {
                return (
                    <MovieTile
                        id={item.id}
                        imagePath={item.posterPath}
                        size={size}
                        title={item.title}
                        votesAmount={item.voteCount}
                        votesAverage={item.voteAverage}
                    />
                );
            },
            [size]
        );

        const keyExtractor = useCallback((item: IMovie) => item.id.toString(), []);

        return (
            <View style={{ ...style.container, display: hide ? 'none' : 'flex' }}>
                {label && (
                    <View>
                        <TouchableWithoutFeedback>
                            <View style={style.listHeader}>
                                <Text variant="titleLarge" style={style.label}>
                                    {label}
                                </Text>
                                {category && (
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigate('CategoryScreen', {
                                                category: category
                                            })
                                        }
                                    >
                                        <Text variant="labelMedium" style={style.showMore}>
                                            {t('home.showMore')}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}
                <View style={style.list}>
                    {/* TODO: Replace with Flash List - RN version not supported yet */}
                    <FlatList
                        data={movies}
                        renderItem={renderMovieItem}
                        onEndReachedThreshold={1}
                        onEndReached={handleLoadMoreMovies}
                        keyExtractor={keyExtractor}
                        horizontal={horizontal}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            category && (
                                <View style={style.emptyList}>
                                    <TouchableWithoutFeedback>
                                        <View>
                                            <Text
                                                variant="labelLarge"
                                                style={style.emptyListMessage}
                                            >
                                                {emptyListMessage || t('home.emptyList')}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )
                        }
                        ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
                    />
                </View>
            </View>
        );
    }
);

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            flex: 1
        },
        listHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        label: {
            color: colors.primary,
            marginLeft: 16
        },
        showMore: {
            textDecorationLine: 'underline',
            marginRight: 16
        },
        list: {
            flex: 1,
            marginTop: 16,
            alignItems: 'center'
        },
        emptyList: {
            height: 128,
            justifyContent: 'center'
        },
        emptyListMessage: {
            color: colors.primary
        }
    });
