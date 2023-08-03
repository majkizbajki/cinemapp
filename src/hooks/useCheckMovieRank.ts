import { useAppSelector } from '../app/hooks';
import {
    selectPopularMovies,
    selectTopRatedMovies,
    selectUpcomingMovies
} from '../app/services/movies/moviesSlice';
import { useTranslation } from 'react-i18next';

export const useCheckMovieRank = (movieId: number) => {
    const { t } = useTranslation();

    const popularMovies = useAppSelector(selectPopularMovies);
    const topRatedMovies = useAppSelector(selectTopRatedMovies);
    const upcomingMovies = useAppSelector(selectUpcomingMovies);

    for (let i = 0; i < 3; i++) {
        if (topRatedMovies.movies[i].id === movieId) {
            return { rank: t('movieDetails.topRatedRank', { number: i }) };
        }
        if (popularMovies.movies[i].id === movieId) {
            return { rank: t('movieDetails.popularRank', { number: i }) };
        }
        if (upcomingMovies.movies[i].id === movieId) {
            return { rank: t('movieDetails.upcomingRank', { number: i }) };
        }
    }

    return { rank: undefined };
};
