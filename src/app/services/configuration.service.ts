import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Configuration } from '../model/configuration';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ConfigurationService {

  public _config : object;
  OpenWeatherKeyChange: Subject<string> = new Subject<string>();

  constructor(private http: Http, private toastrService : ToastrService) { 
    this.getConfiguration();
  }

  public getConfiguration() {
    let url = "http://clock/data/config.json";
    let result : Configuration = null;
    try
    {
      this.http.get(url).subscribe((value: Response) => {
        this._config = <Configuration>value.json();
        this.OpenWeatherKeyChange.next(this._config["openWeather"]["key"]);
      });
    }
    catch(ex)
    {
      this.toastrService.error("Unable to get configuration", "Configuration Service");
    }
  }
}
