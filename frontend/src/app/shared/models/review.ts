import {UserProfile} from "./UserProfile";
import {Movie} from "./Movie";

export interface Review {
  id: number,
  user: UserProfile,
  movie: Movie,
  review: string,
  reviewPostedAt: string,
  rating: number,

}
