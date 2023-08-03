export type Genre = {
    id: number;
    name: string;
};

export type ProductionCountry = {
    iso_3166_1: string;
    name: string;
};

export interface IMovie {
    backdropPath: string;
    id: number;
    popularity: number;
    title: string;
    voteAverage: number;
    voteCount: number;
}

export interface IMovieDetails extends IMovie {
    genres: string[];
    overview: string;
    productionCountries: string[];
}

export interface IMovies {
    movies: IMovie[];
    loadedPages: number;
}

// Response

export interface IMoviesResponse {
    results: Array<{
        backdrop_path: string;
        id: number;
        popularity: number;
        title: string;
        vote_average: number;
        vote_count: number;
    }>;
    page: number;
}

export interface IMovieDetailsResponse {
    backdrop_path: string;
    genres: Genre[];
    id: number;
    overview: string;
    popularity: number;
    production_countries: ProductionCountry[];
    title: string;
    vote_average: number;
    vote_count: number;
}
