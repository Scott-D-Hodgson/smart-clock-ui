export interface Weather {
    longitude : number;
    latitude : number;
    id : number;
    temperature : number;
    current : string;
    description : string;
    icon : string;
    humidity : number;
    pressure : number;
    visibility : number;
    clouds : number;
    rain : number;
    snow : number;
    windSpeed : number;
    windDirection : number;
    sunrise : Date;
    sunset : Date;
}