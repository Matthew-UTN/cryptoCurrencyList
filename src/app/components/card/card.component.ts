import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { crypto } from '../../models/crypto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() crypto: crypto = null;

  @Input() color: string = 'clear';


  constructor() { }

  ngOnInit(): void {
  }
}
