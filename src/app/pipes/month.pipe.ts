import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    let months : string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[value.getMonth()];
  }

}
