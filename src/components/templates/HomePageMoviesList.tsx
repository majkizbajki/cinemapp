import { useTranslation } from 'react-i18next';
import { IMovie } from '../../app/services/movies/types';
import { MovieTileSize } from '../molecules';
import { useAppSelector } from '../../app/hooks';
import {
    selectNowPlayingMovies,
    selectPopularMovies,
    selectTopRatedMovies,
    selectUpcomingMovies
} from '../../app/services/movies/moviesSlice';
import { FlatList } from 'react-native';
import { MoviesList } from '../organism';
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery
} from '../../app/services/movies/moviesApi';
import { CategoryScreenTypes } from '../../navigation/types';

interface IMoviesListItem {
    category?: CategoryScreenTypes;
    label: string;
    movies: IMovie[];
    size: MovieTileSize;
    horizontal: boolean;
    handleLoadMoreMovies?: () => void;
}

interface IHomePageMoviesListProps {
    hide: boolean;
}

export const HomePageMoviesList = ({ hide }: IHomePageMoviesListProps) => {
    const { t } = useTranslation();

    const { movies: nowPlayingMovies, loadedPages: nowPlayingLoadedPages } =
        useAppSelector(selectNowPlayingMovies);
    const { movies: popularMovies, loadedPages: popularLoadedPages } =
        useAppSelector(selectPopularMovies);
    const { movies: topRatedMovies, loadedPages: topRatedLoadedPages } =
        useAppSelector(selectTopRatedMovies);
    const { movies: upcomingMovies, loadedPages: upcomingLoadedPages } =
        useAppSelector(selectUpcomingMovies);

    useGetNowPlayingMoviesQuery(1, { skip: nowPlayingLoadedPages > 1 });
    useGetPopularMoviesQuery(1, { skip: popularLoadedPages > 1 });
    useGetTopRatedMoviesQuery(1, { skip: topRatedLoadedPages > 1 });
    useGetUpcomingMoviesQuery(1, { skip: upcomingLoadedPages > 1 });

    const listItems: IMoviesListItem[] = [
        {
            category: 'nowPlaying',
            label: t('home.nowPlaying'),
            movies: nowPlayingMovies,
            size: 'small',
            horizontal: true
        },
        {
            category: 'popular',
            label: t('home.popular'),
            movies: popularMovies,
            size: 'small',
            horizontal: true
        },
        {
            category: 'topRated',
            label: t('home.topRated'),
            movies: topRatedMovies,
            size: 'small',
            horizontal: true
        },
        {
            category: 'upcoming',
            label: t('home.upcoming'),
            movies: upcomingMovies,
            size: 'small',
            horizontal: true
        }
    ];

    return (
        <FlatList
            style={{ display: hide ? 'none' : 'flex' }}
            data={listItems}
            renderItem={({ item }) => {
                return (
                    <MoviesList
                        category={item.category}
                        label={item.label}
                        movies={item.movies.slice(0, 5)}
                        handleLoadMoreMovies={item.handleLoadMoreMovies}
                        horizontal={item.horizontal}
                        size={item.size}
                    />
                );
            }}
        />
    );
};
