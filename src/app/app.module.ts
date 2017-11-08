import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimeComponent } from './time/time.component';
import { DateComponent } from './date/date.component';
import { WallpaperComponent } from './wallpaper/wallpaper.component';
import { ForecastComponent } from './forecast/forecast.component';
import { HttpModule } from '@angular/http';
import { OpenWeatherService } from './services/open-weather.service';
import { ConfigurationService } from './services/configuration.service';
import { WeatherComponent } from './weather/weather.component';
import { CelciusPipe } from './pipes/celcius.pipe';
import { TimePipe } from './pipes/time.pipe';
import { QuoteComponent } from './quote/quote.component';
import { TheySaidSoService } from './services/they-said-so.service';
import { CalendarComponent } from './calendar/calendar.component';
import { TimerPulseService } from './services/timer-pulse.service';
import { DatePipe } from './pipes/date.pipe';
import { MonthPipe } from './pipes/month.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimeComponent,
    DateComponent,
    WallpaperComponent,
    ForecastComponent,
    WeatherComponent,
    CelciusPipe,
    TimePipe,
    QuoteComponent,
    CalendarComponent,
    DatePipe,
    MonthPipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TimerPulseService, ConfigurationService, OpenWeatherService, TheySaidSoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
