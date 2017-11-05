import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Forecast } from '../model/forecast';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Weather } from '../model/weather';

@Injectable()
export class OpenWeatherService {

  private key : string;
  public Forecast : Forecast[];
  ForecastChange: Subject<Forecast[]> = new Subject<Forecast[]>();
  public Weather : Weather;
  WeatherChange: Subject<Weather> = new Subject<Weather>();

  constructor(private configurationService : ConfigurationService, private http : Http ) { 
    this.ForecastChange.subscribe(value => {
      this.Forecast = value;
      console.log('Forecast Changed');
    });   
    this.WeatherChange.subscribe(value => {
      this.Weather = value;
      console.log('Weather Changed');
    });     
    this.configurationService.OpenWeatherKeyChange.subscribe(value => {
      this.key = value;
      console.log('OpenWeather Service got value: ' + value);
      this.getWeather();
      this.getForecast();      
    });
  }

  public getForecast() {
    let url = "http://api.openweathermap.org/data/2.5/forecast?id=6094817&APPID=" + this.key;
    try
    {
      let forecasts : Forecast[] = [];
      this.http.get(url).subscribe((value: Response) => {
        let raw : Object;
        raw = <Object>value.json();
        if (raw != null) {
          //console.log(JSON.stringify(raw));
          if(raw.hasOwnProperty("list")){
            //console.log(raw["list"].length);
            for (let i = 0; i < raw["list"].length; i++) {
              // todo: define a class of this interface and initialize it properly
              let forecast : Forecast = <Forecast>{};
              if(raw["list"][i].hasOwnProperty("dt")) {
                forecast.dateTime = new Date(raw["list"][i]["dt"] * 1000);              
              };
              if(raw["list"][i].hasOwnProperty("main")) {
                forecast.temperature = raw["list"][i]["main"]["temp"];
                forecast.min = raw["list"][i]["main"]["temp_min"];
                forecast.max = raw["list"][i]["main"]["temp_max"];
                forecast.humidity = raw["list"][i]["main"]["humidity"];
                forecast.pressure = raw["list"][i]["main"]["pressure"];
              };
              if(raw["list"][i].hasOwnProperty("weather")) {
                forecast.id = raw["list"][i]["weather"][0]["id"];
                forecast.prediction = raw["list"][i]["weather"][0]["main"];
                forecast.description = raw["list"][i]["weather"][0]["description"];
                forecast.icon = raw["list"][i]["weather"][0]["icon"];
              };
              if(raw["list"][i].hasOwnProperty("wind")) {
                forecast.windSpeed = raw["list"][i]["wind"]["speed"];
                forecast.windDirection = raw["list"][i]["wind"]["deg"]; 
              };
              if(raw["list"][i].hasOwnProperty("clouds")) {
                forecast.clouds = raw["list"][i]["clouds"]["all"];
              };
              if(raw["list"][i].hasOwnProperty("rain")) {
                forecast.rain = raw["list"][i]["rain"]["3h"];
              };
              if(raw["list"][i].hasOwnProperty("snow")) {
                forecast.snow = raw["list"][i]["snow"]["3h"];
              };
              //console.log(JSON.stringify(forecast));
              forecasts.push(forecast);
            };              
          };
        };
        //console.log(JSON.stringify(forecasts));
        this.ForecastChange.next(forecasts);
      });
    }
    catch(ex)
    { 
      console.log('Error getting forecast.');
    }
  }

  public getWeather() {
    let url = "http://api.openweathermap.org/data/2.5/weather?id=6094817&APPID=" + this.key;
    try
    {
      this.http.get(url).subscribe((value: Response) => {
        let raw : Object;
        raw = <Object>value.json();
        if (raw != null) {
          console.log(JSON.stringify(raw));
          let weather : Weather = <Weather>{};
          if(raw.hasOwnProperty("coord")){
            weather.latitude = raw["coord"]["lat"];
            weather.longitude = raw["coord"]["lon"];
          };
          if(raw.hasOwnProperty("main")) {
            weather.temperature = raw["main"]["temp"];
            weather.humidity = raw["main"]["humidity"];
            weather.pressure = raw["main"]["pressure"];
          };
          if(raw.hasOwnProperty("weather")) {
            weather.id = raw["weather"][0]["id"];
            weather.current = raw["weather"][0]["main"];
            weather.description = raw["weather"][0]["description"];
            weather.icon = raw["weather"][0]["icon"];
          };
          if(raw.hasOwnProperty("visibility")) {
            weather.visibility = raw["visibility"];
          };          
          if(raw.hasOwnProperty("wind")) {
            weather.windSpeed = raw["wind"]["speed"];
            weather.windDirection = raw["wind"]["deg"]; 
          };
          if(raw.hasOwnProperty("clouds")) {
            weather.clouds = raw["clouds"]["all"];
          };
          if(raw.hasOwnProperty("rain")) {
            weather.rain = raw["rain"]["all"];
          };
          if(raw.hasOwnProperty("snow")) {
            weather.snow = raw["snow"]["all"];
          };
          if(raw.hasOwnProperty("sys")) {
            weather.sunrise = new Date(raw["sys"]["sunrise"] * 1000);              
            weather.sunset = new Date(raw["sys"]["sunset"] * 1000);              
          };
          //console.log(JSON.stringify(forecast));
          this.WeatherChange.next(weather);              
        };
        //console.log(JSON.stringify(forecasts)
      });
    }
    catch(ex)
    { 
      console.log('Error getting weather.');
    }
  }


}
