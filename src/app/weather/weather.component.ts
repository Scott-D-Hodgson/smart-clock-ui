import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../services/open-weather.service';
import { Weather } from '../model/weather';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private _weather : Weather;
  private _subscriptionWeather : Subscription;

  constructor(private openWeatherService : OpenWeatherService, private toastrService : ToastrService) { 
    this._subscriptionWeather = this.openWeatherService.WeatherChange.subscribe(value => {
      this._weather = value;
      this.toastrService.info("Updated", "Weather Component"); 
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionWeather.unsubscribe();
  }
}
