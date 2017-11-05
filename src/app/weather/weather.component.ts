import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../services/open-weather.service';
import { Weather } from '../model/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private _weather : Weather;

  constructor(private openWeatherService : OpenWeatherService) { 
    this.openWeatherService.WeatherChange.subscribe(value => {
      this._weather = value;
      console.log('Weather Component got results!');
    });}

  ngOnInit() {
  }

}
