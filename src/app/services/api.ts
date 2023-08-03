import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

const baseQuery = fetchBaseQuery({
    baseUrl: Config.API_URL
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['NowPlaying', 'Popular', 'TopRated', 'Upcoming', 'Movie', 'Search'],
    endpoints: () => ({})
});
