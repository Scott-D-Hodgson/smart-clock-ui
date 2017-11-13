import { Component, OnInit } from '@angular/core';
import { Quote } from '../model/quote';
import { TheySaidSoService } from '../services/they-said-so.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  private _quote : Quote;
  
  constructor(private theySaidSoService : TheySaidSoService, private toastrService : ToastrService) { 
    this.theySaidSoService.QuoteChange.subscribe(value => {
      this._quote = value;
      this.toastrService.info("Updated", "Quote Component");
    });}

    ngOnInit() {
    }
}
