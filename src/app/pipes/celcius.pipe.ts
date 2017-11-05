import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celcius'
})
export class CelciusPipe implements PipeTransform {

  transform(value: number, args?: any): number {
    return Math.round(value - 273.15);
  }

}
