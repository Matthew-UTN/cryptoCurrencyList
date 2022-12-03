import { Component, OnInit } from '@angular/core';
import { Service } from '../../services/service.service';
import { crypto } from '../../models/crypto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterFieldAlphabet: string = "";
  filterFieldPrice: string = "";
  wordSearch: string = "";

  filtersAlphabet:string[] = ['A-Z', 'Z-A'];
  filtersPrice:string[] = ['low to high', 'high to low'];

  header:crypto = {
    symbol: 'Symbol',
    baseAsset: 'Base Asset',
    openPrice: 'Open Price',
    lowPrice: 'Low Price',
    highPrice: 'High Price',
    lastPrice: 'Last Price',
    volume: 'Volume'
  }
  
  activeSearch: boolean = false;
  activeSearchAlphabet: boolean = false;
  activeSearchPrice: boolean = false;

  loading: boolean;

  cryptos: crypto[] = [];
  filteredCryptoList: any[];
  unfiltered: crypto[];

  constructor(private data: Service) { }

  ngOnInit(): void {
    this.getCryptos();
  }

  async getCryptos(){
    this.loading = true;
    this.data.getAllCryptos().subscribe((result) => {
      this.cryptos = <crypto[]>result;
      this.loading = false;
    });
  }

  activateFilterAlphabet(filter: any){
    this.filterFieldAlphabet = filter;
    this.filterFieldPrice = "";
    this.activeSearchAlphabet = true;
  }

  activateFilterPrice(filter: any){
    this.filterFieldPrice = filter;
    this.filterFieldAlphabet = "";
    this.activeSearchPrice = true;
  }

  removeFilter() {
    this.wordSearch = "";
  }

  removeFilterAlphabet() {
    this.filterFieldAlphabet = "";
  }

  removeFilterPrice() {
    this.filterFieldPrice = "";
  }

  inactiveFilter():boolean {
    return !this.activeSearch;
  }

  inactiveFilterAlphabet():boolean {
    return !this.activeSearchAlphabet;
  }

  inactiveFilterPrice():boolean {
    return !this.activeSearchPrice;
  }

  verifyFilters(){
    this.activeSearch = this.wordSearch == ""?false:true;
    this.activeSearchAlphabet = this.filterFieldAlphabet == ""?false:true;
    this.activeSearchPrice = this.filterFieldPrice == ""?false:true;
  }

  getCryptoList(list: crypto[]) {
    this.verifyFilters();
    let cryptoList = [];
    for(let listitem of list)
      cryptoList.push(listitem);
    let filteredCryptoList = [];
    if(this.filterFieldAlphabet || this.filterFieldPrice){
      switch(this.filterFieldAlphabet) {     
        case 'A-Z':
          cryptoList.sort(function (a, b) {
            var textA = a.baseAsset.toUpperCase();
            var textB = b.baseAsset.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          });
          break;        
        
        case 'Z-A':
          cryptoList.sort(function (a, b) {
            var textA = a.baseAsset.toUpperCase();
            var textB = b.baseAsset.toUpperCase();
            return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
          });
          break;
      }
      switch(this.filterFieldPrice) {
        case 'low to high':
          cryptoList.sort(function (a, b) {
            var textA = Number(a.openPrice);
            var textB = Number(b.openPrice);
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          });
          break;
  
        case 'high to low':
          cryptoList.sort(function (a, b) {
            var textA = Number(a.openPrice);
            var textB = Number(b.openPrice);
            return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
          });
          break;
      }
    }

    if (this.wordSearch) {
      filteredCryptoList = cryptoList.filter(element =>
        (element.baseAsset.toLowerCase()).includes(this.wordSearch.toLowerCase()));
    } else {
      filteredCryptoList = cryptoList;
    }
    this.filteredCryptoList = filteredCryptoList;
    return this.filteredCryptoList;
  }

}
