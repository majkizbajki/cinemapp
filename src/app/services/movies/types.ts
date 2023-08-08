export type Genre = {
    id: number;
    name: string;
};

export type ProductionCountry = {
    iso_3166_1: string;
    name: string;
};

export interface Movie {
    posterPath: string;
    id: number;
    popularity: number;
    title: string;
    voteAverage: number;
    voteCount: number;
}

export interface MovieDetails extends Movie {
    genres: string[];
    overview: string;
    productionCountries: string[];
}

export interface Movies {
    movies: Movie[];
    loadedPages: number;
    query?: string;
}

// Response

export interface MoviesResponse {
    results: Array<{
        poster_path: string;
        id: number;
        popularity: number;
        title: string;
        vote_average: number;
        vote_count: number;
    }>;
    page: number;
}

export interface MovieDetailsResponse {
    poster_path: string;
    genres: Genre[];
    id: number;
    overview: string;
    popularity: number;
    production_countries: ProductionCountry[];
    title: string;
    vote_average: number;
    vote_count: number;
}
