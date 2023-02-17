import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-rate',
  templateUrl: './card-rate.component.html',
  styleUrls: ['./card-rate.component.scss']
})
export class CardRateComponent {
  @Input() rating?: number;

}
