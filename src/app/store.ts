import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './services/movies/moviesSlice';
import { api } from './services/api';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        movies: moviesReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([api.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
