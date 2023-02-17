import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../shared/models/Movie";
import {Router} from "@angular/router";
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{

  @Input() movieData?: Movie[];

constructor(
  private router: Router
) {
}

  ngOnInit(): void {

  }

  onClick(movieID: number) {
    this.router.navigate(['/movie',movieID]);

  }


}
