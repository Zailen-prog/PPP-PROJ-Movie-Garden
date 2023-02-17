import {Component, Input, OnInit} from '@angular/core';

import {AuthService} from "../../../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Actions} from "../../models/actions";

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent  implements OnInit {
  isLogin: boolean = true;
  @Input() movieId?: number;
  @Input() actions: Actions = {
    isFavorite:false,
    isToWatch:false,
    isWatched:false }

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {}


  ngOnInit(): void {
    this.authService.isLoginMode.subscribe((value) => this.isLogin = value)
  }

  onFavoriteClick(event:any ) {
    event.stopPropagation();
    const idMovie = this.movieId;
    this.http.put<any>(`http://localhost:8000/Movie/add_to_favorites/${idMovie}/`,{}).subscribe();
    this.actions.isFavorite =  !this.actions.isFavorite;
  }

  onToWatchClick(event:any ) {
    event.stopPropagation();
    const idMovie = this.movieId;
    this.http.put<any>(`http://localhost:8000/Movie/add_to_to_watch/${idMovie}/`,{}).subscribe();
    this.actions.isToWatch =  !this.actions.isToWatch;
  }

  onWatched(event:any ) {
    event.stopPropagation();
    const idMovie = this.movieId;
    this.http.put<any>(`http://localhost:8000/Movie/add_to_watched/${idMovie}/`,{}).subscribe();
    this.actions.isWatched =  !this.actions.isWatched;
  }
}
