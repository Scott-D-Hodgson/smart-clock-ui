import { Component, OnInit } from '@angular/core';
import { Quote } from '../model/quote';
import { TheySaidSoService } from '../services/they-said-so.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  private _quote : Quote;
  
  constructor(private theySaidSoService : TheySaidSoService) { 
    this.theySaidSoService.QuoteChange.subscribe(value => {
      this._quote = value;
      console.log('Quote Component got results!');
    });}

    ngOnInit() {
    }
}
