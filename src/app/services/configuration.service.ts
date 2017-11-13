import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Configuration } from '../model/configuration';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ConfigurationService {

  public OpenWeatherKey : string;
  OpenWeatherKeyChange: Subject<string> = new Subject<string>();

  constructor(private http: Http, private toastrService : ToastrService) { 
    this.OpenWeatherKeyChange.subscribe(value => {
      this.OpenWeatherKey = value;
      this.toastrService.error("Got Open Weather Api Key", "Configuration Service");
    });
    this.getConfiguration();
  }

  public getConfiguration() {
    let url = "http://clock/data/config.json";
    let result : Configuration = null;
    try
    {
      this.http.get(url).subscribe((value: Response) => {
        result = <Configuration>value.json();
        this.OpenWeatherKeyChange.next(result.keys.openWeather);
      });
    }
    catch(ex)
    {
      this.toastrService.error("Unable to get configuration", "Configuration Service");
    }
  }
}
