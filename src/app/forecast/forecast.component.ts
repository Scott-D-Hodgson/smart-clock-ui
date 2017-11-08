import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../services/open-weather.service';
import { ConfigurationService } from '../services/configuration.service';
import { Forecast } from '../model/forecast';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  private _forecast : Forecast[];
  private _subscriptionWeather : Subscription;

  constructor(private openWeatherService : OpenWeatherService) { 
      this._subscriptionWeather = this.openWeatherService.ForecastChange.subscribe(value => {
        this._forecast = [];
        let length = 8;
        if (value.length < length) { length = value.length };
        for (let i = 0; i < length; i++) {
          this._forecast.push(value[i]);
        };
        console.log('ForecastComponent:Updated');
      });
    }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionWeather.unsubscribe();
  }
}
