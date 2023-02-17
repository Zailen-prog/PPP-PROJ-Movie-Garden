import {Component, Input, OnInit} from '@angular/core';
import { Movie } from 'src/app/shared/models/Movie';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {

  @Input() movie!: Movie;
  @Input() detailsMode: boolean = false;

  constructor() {
  }


  ngOnInit(): void {

  }

}
