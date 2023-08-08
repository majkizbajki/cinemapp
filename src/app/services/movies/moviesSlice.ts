import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { moviesApi } from './moviesApi';
import { Movies } from './types';

interface MovieState {
    nowPlayingMovies: Movies;
    popularMovies: Movies;
    searchedMovies: Movies;
    topRatedMovies: Movies;
    upcomingMovies: Movies;
}

const initialState: MovieState = {
    nowPlayingMovies: {
        movies: [],
        loadedPages: 0
    },
    popularMovies: {
        movies: [],
        loadedPages: 0
    },
    searchedMovies: {
        movies: [],
        loadedPages: 0
    },
    topRatedMovies: {
        movies: [],
        loadedPages: 0
    },
    upcomingMovies: {
        movies: [],
        loadedPages: 0
    }
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            moviesApi.endpoints.getNowPlayingMovies.matchFulfilled,
            (state, { payload }) => {
                state.nowPlayingMovies = {
                    movies: [...state.nowPlayingMovies.movies, ...payload.movies],
                    loadedPages: payload.loadedPages
                };
            }
        );
        builder.addMatcher(
            moviesApi.endpoints.getPopularMovies.matchFulfilled,
            (state, { payload }) => {
                state.popularMovies = {
                    movies: [...state.popularMovies.movies, ...payload.movies],
                    loadedPages: payload.loadedPages
                };
            }
        );
        builder.addMatcher(
            moviesApi.endpoints.getTopRatedMovies.matchFulfilled,
            (state, { payload }) => {
                state.topRatedMovies = {
                    movies: [...state.topRatedMovies.movies, ...payload.movies],
                    loadedPages: payload.loadedPages
                };
            }
        );
        builder.addMatcher(
            moviesApi.endpoints.getUpcomingMovies.matchFulfilled,
            (state, { payload }) => {
                state.upcomingMovies = {
                    movies: [...state.upcomingMovies.movies, ...payload.movies],
                    loadedPages: payload.loadedPages
                };
            }
        );
        builder.addMatcher(
            moviesApi.endpoints.getSearchedMovies.matchFulfilled,
            (state, { payload }) => {
                state.searchedMovies = {
                    movies:
                        payload.loadedPages > 1
                            ? [...state.searchedMovies.movies, ...payload.movies]
                            : payload.movies,
                    loadedPages: payload.loadedPages,
                    query: payload.query
                };
            }
        );
    }
});

export const selectNowPlayingMovies = (state: RootState) => state.movies.nowPlayingMovies;
export const selectPopularMovies = (state: RootState) => state.movies.popularMovies;
export const selectSearchedMovies = (state: RootState) => state.movies.searchedMovies;
export const selectTopRatedMovies = (state: RootState) => state.movies.topRatedMovies;
export const selectUpcomingMovies = (state: RootState) => state.movies.upcomingMovies;

export default moviesSlice.reducer;
