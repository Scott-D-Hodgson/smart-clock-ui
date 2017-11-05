import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    let ampm = "AM";
    let hour = value.getHours();
    if (hour >= 12) {
      hour = hour - 12;
      ampm = 'PM';
    };
    if (hour == 0) {
      hour = 12;
    };
    let min = value.getMinutes();
    return [hour, ':', min > 9 ? '' : '0', min, ' ', ampm].join('');
  }

}
