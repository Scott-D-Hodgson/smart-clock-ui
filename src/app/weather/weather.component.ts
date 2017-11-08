import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../services/open-weather.service';
import { Weather } from '../model/weather';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private _weather : Weather;
  private _subscriptionWeather : Subscription;

  constructor(private openWeatherService : OpenWeatherService) { 
    this._subscriptionWeather = this.openWeatherService.WeatherChange.subscribe(value => {
      this._weather = value;
      console.log('WeatherComponent:Updated');
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionWeather.unsubscribe();
  }
}
