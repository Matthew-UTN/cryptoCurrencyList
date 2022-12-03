import { Component, OnInit, Input } from '@angular/core';
import { crypto } from '../../models/crypto';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input() cryptoList: crypto[] = [];

  p: number = 1;

  modal: boolean = false;
  cryptoToShow: crypto;

  constructor() { }

  ngOnInit(): void {
  }

  positionCrypto(list: crypto[]){
    let reducedList = [];
    for(let listitem of list)
      reducedList.push(listitem);
    
    return reducedList; 
  }

  showModal(crypto: crypto){
    this.cryptoToShow = crypto;
    this.modal = true;
  }

  closeModal(){
    this.cryptoToShow = null;
    this.modal = false;
  }

}
