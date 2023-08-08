import Config from 'react-native-config';
import { api } from '../api';
import { Movie, MovieDetails, MovieDetailsResponse, Movies, MoviesResponse } from './types';
import i18n, { Locales } from '../../../i18n/i18n';

const transformQueryResponse = (response: MoviesResponse): Movies => {
    const movies: Movie[] = [];
    for (const item of response.results) {
        movies.push({
            posterPath: item.poster_path,
            id: item.id,
            popularity: item.popularity,
            title: item.title,
            voteAverage: item.vote_average,
            voteCount: item.vote_count
        });
    }

    return {
        movies,
        loadedPages: response.page
    };
};

export const moviesApi = api.injectEndpoints({
    endpoints: builder => ({
        getNowPlayingMovies: builder.query<Movies, number>({
            query: page => ({
                url: 'movie/now_playing',
                params: {
                    api_key: Config.API_KEY,
                    language: Locales[i18n.language as keyof typeof Locales],
                    page
                }
            }),
            transformResponse: (response: MoviesResponse) => {
                return transformQueryResponse(response);
            },
            providesTags: result =>
                result
                    ? [
                          ...result.movies.map(({ id }) => ({ type: 'NowPlaying' as const, id })),
                          { type: 'NowPlaying', id: 'NOW-PLAYING-LIST' }
                      ]
                    : [{ type: 'NowPlaying', id: 'NOW-PLAYING-LIST' }]
        }),
        getPopularMovies: builder.query<Movies, number>({
            query: page => ({
                url: 'movie/popular',
                params: {
                    api_key: Config.API_KEY,
                    language: Locales[i18n.language as keyof typeof Locales],
                    page
                }
            }),
            transformResponse: (response: MoviesResponse) => {
                return transformQueryResponse(response);
            },
            providesTags: result =>
                result
                    ? [
                          ...result.movies.map(({ id }) => ({ type: 'Popular' as const, id })),
                          { type: 'Popular', id: 'POPULAR-LIST' }
                      ]
                    : [{ type: 'Popular', id: 'POPULAR-LIST' }]
        }),
        getTopRatedMovies: builder.query<Movies, number>({
            query: page => ({
                url: 'movie/top_rated',
                params: {
                    api_key: Config.API_KEY,
                    language: Locales[i18n.language as keyof typeof Locales],
                    page
                }
            }),
            transformResponse: (response: MoviesResponse) => {
                return transformQueryResponse(response);
            },
            providesTags: result =>
                result
                    ? [
                          ...result.movies.map(({ id }) => ({ type: 'TopRated' as const, id })),
                          { type: 'TopRated', id: 'TOP-RATED-LIST' }
                      ]
                    : [{ type: 'TopRated', id: 'TOP-RATED-LIST' }]
        }),
        getUpcomingMovies: builder.query<Movies, number>({
            query: page => ({
                url: 'movie/upcoming',
                params: {
                    api_key: Config.API_KEY,
                    language: Locales[i18n.language as keyof typeof Locales],
                    page
                }
            }),
            transformResponse: (response: MoviesResponse) => {
                return transformQueryResponse(response);
            },
            providesTags: result =>
                result
                    ? [
                          ...result.movies.map(({ id }) => ({ type: 'Upcoming' as const, id })),
                          { type: 'Upcoming', id: 'UPCOMING-LIST' }
                      ]
                    : [{ type: 'Upcoming', id: 'UPCOMING-LIST' }]
        }),
        getMovieDetails: builder.query<MovieDetails, number>({
            query: id => ({
                url: `movie/${id}`,
                params: {
                    api_key: Config.API_KEY,
                    language: Locales[i18n.language as keyof typeof Locales]
                }
            }),
            transformResponse: ({
                id,
                overview,
                popularity,
                title,
                ...result
            }: MovieDetailsResponse) => {
                return {
                    posterPath: result.poster_path,
                    genres: result.genres.map(genre => genre.name),
                    id,
                    overview,
                    popularity,
                    productionCountries: result.production_countries.map(country => country.name),
                    title,
                    voteAverage: result.vote_average,
                    voteCount: result.vote_count
                };
            },
            providesTags: ['Movie']
        }),
        getSearchedMovies: builder.query<Movies, { page: number; query?: string }>({
            query: ({ page, query }) => ({
                url: 'search/movie',
                params: {
                    api_key: Config.API_KEY,
                    language: Locales[i18n.language as keyof typeof Locales],
                    query,
                    page
                }
            }),
            transformResponse: (response: MoviesResponse) => {
                return transformQueryResponse(response);
            },
            providesTags: result =>
                result
                    ? [
                          ...result.movies.map(({ id }) => ({ type: 'Search' as const, id })),
                          { type: 'Search', id: 'SEARCH-LIST' }
                      ]
                    : [{ type: 'Search', id: 'SEARCH-LIST' }]
        })
    })
});

export const {
    useGetMovieDetailsQuery,
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetSearchedMoviesQuery
} = moviesApi;
