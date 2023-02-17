import {Actions} from "./actions";

export interface Movie {
  posterPath: string;
  title: string;
  runtime:number | null;
  language: string;
  overview: string;
  directors: string[];
  writers: string[];
  id: number;
  releaseDate: string;
  genres: string[];
  rating: number;
  actions: Actions;
}
