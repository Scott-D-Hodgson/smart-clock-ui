import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../services/open-weather.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.css']
})
export class WallpaperComponent implements OnInit {

  _image : string;
  _subscriptionWeather : Subscription;

  constructor(private openWeatherService : OpenWeatherService) { 
    this._subscriptionWeather = this.openWeatherService.WeatherChange.subscribe(value => {
      this._image = this.getImageUrl(value.id);
      console.log('WallpaperComponent:Updated');
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this._subscriptionWeather.unsubscribe();
  }

  private getImageUrl (code : number) : string {
    console.log("Wallpaper Weather Code: " + code)
    let imageFilename : string = "";
    switch (code) {
      case 200: // Thunderstorm with light rain
      case 201: // Thunderstorm with rain
      case 202: // Thunderstorm with heavy rain
      case 210: // Light thunderstorm
      case 211: // Thunderstorm
      case 212: // Heavy thunderstorm
      case 221: // Ragged thunderstorm
      case 230: // Thunderstorm with light drizzle
      case 231: // Thunderstorm with drizzle
      case 232: // Thunderstorm with heavy drizzle 
        // Author: skeeze
        imageFilename = "thunderstorm_2-wallpaper-800x480.jpg";
        break;
      case 300: // Light intensity drizzle
      case 301: // Drizzle
      case 302: // Heavy intensity drizzle
      case 310: // Light intensity drizzle rain
      case 311: // Drizzle rain
      case 312: // Heavy intensity drizzle rain
      case 313: // Shower rain and drizzle
      case 314: // Heavy shower rain and drizzle
      case 321: // Shower drizzle
          // Author: orb9220
          imageFilename = "drizzle_dark-wallpaper-800x480.jpg";
          break;
      case 500: // Light rain
      case 501: // Moderate rain
      case 502: // Heavy intensity rain
      case 503: // Very heavy rain
      case 504: // Extreme rain
      case 520: // Light intensity shower rain
      case 521: // Shower rain
      case 522: // Heavy intensity shower rain
      case 531: // Ragged shower rain
        // Author: Samruth Raj
        imageFilename = "rain_drops_6-wallpaper-800x480.jpg";
        break;
      case 511: // Freezing rain
        // Author: Amarpreet Kaur
        imageFilename = "a_magical_world-wallpaper-800x480.jpg";
        break;
      case 600: // Light snow
      case 601: // Snow
      case 602: // Heavy snow
      case 611: // Sleet
      case 612: // Shower sleet
      case 615: // Light rain and snow
      case 616: // Rain and snow
      case 620: // Light shower snow
      case 621: // Shower snow
      case 622: // Heavy shower snow
        // Author: Salmando
        imageFilename = "squirrel_in_a_snowfall-wallpaper-800x480.jpg";
        break;              
      case 700: // Mist
      case 741: // Fog
      // Author: Barney Moss
        imageFilename = "misty_forest_track_beautiful_autumn-wallpaper-800x480.jpg";
        break;                      
      case 711: // Smoke
        // Author: Yann Le Moing
        imageFilename = "feeding_the_clouds-wallpaper-800x480.jpg";
        break; 
      case 721: // Haze
        // Author: Lambert Wolterbeek Muller
        imageFilename = "lonely_lantern_in_the_fog-wallpaper-800x480.jpg";
        break;   
      case 731: // Sand, dust whirls
      case 751: // Sand
      case 761: // Dust
        // Author: Aurimas Adomavicius 
        imageFilename = "desert_plants-wallpaper-800x480.jpg";
        break;   
      case 762: // Volcanic ash
        // Author: Unknown
        imageFilename = "volcanic_eruption-wallpaper-800x480.jpg";
        break;   
      case 771: // Squalls
        // Author: Unknown
        imageFilename = "sea_storm-wallpaper-800x480.jpg";
        break;   
      case 781: // Tornado
      case 900: // Tornado      
        // Author: Unknown
        imageFilename = "tornado-wallpaper-800x480.jpg";
        break;              
      case 800: // Clear sky
      case 951: // Calm      
        // Author: Unknown
        imageFilename = "perfectly_clear_sunset_sky-wallpaper-800x480.jpg";
        break;
      case 801: // Few clouds
      case 802: // Scattered clouds
      case 803: // Broken clouds
      case 804: // Overcast clouds
        // Author: Ruben Manzano
        imageFilename = "yellow_hill-wallpaper-800x480.jpg";
        break;
      case 901: // Tropical Storm
      case 902: // Hurricane
      case 962: // Hurricane      
        // Author: DarinK
        imageFilename = "hurricane_season-wallpaper-800x480.jpg";
        break;
      case 903: // Cold
        // Author: Douglas Brown
        imageFilename = "winter_alaska-wallpaper-800x480.jpg";
        break;      
      case 904: // Hot
        // Author: Unknown
        imageFilename = "rainforest_waterfall-wallpaper-800x480.jpg";
        break;            
      case 905: // Windy
      case 952: // Light breeze
      case 953: // Gentle breeze
      case 954: // Moderate breeze
      case 955: // Fresh breeze
      case 956: // Strong breeze
        // Author: Zach Dischner
        imageFilename = "kitesurfing_at_sunset-wallpaper-800x480.jpg";
        break;
      case 906: // Hail
        // Author: Andres Nieto Porras.
        imageFilename = "jokulsarlon_ice_beach_iceland-wallpaper-800x480.jpg";
        break;
      case 957: // High wind, near gale
      case 958: // Gale
      case 959: // Severe gale
        // Author: Gianni Dominici
        imageFilename = "blowing_wind-wallpaper-800x480.jpg";
        break;
      case 960: // Storm
      case 961: // Violent storm
        // Author: Unknown
        imageFilename = "lightning_storm-wallpaper-800x480.jpg";
        break;
      default: 
        
    };
    return "http://clock/wallpapers/" + imageFilename;
  }

}
