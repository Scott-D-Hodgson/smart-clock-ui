export interface Forecast {
    dateTime : Date;
    id : number;
    temperature: number;
    min : number;
    max : number; 
    prediction : string;
    description : string;
    icon : string;
    humidity : number;
    pressure : number;
    clouds : number;
    rain : number;
    snow : number;
    windSpeed : number;
    windDirection : number;
}