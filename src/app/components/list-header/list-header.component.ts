import { Component, Input, OnInit } from '@angular/core';
import { crypto } from '../../models/crypto';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  @Input() titles: crypto = null;

  constructor() { }

  ngOnInit(): void {
  }

}
