import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    let day : string = ('0' + value.getDate()).slice(-2);
    let month : string = ('0' + (value.getMonth() + 1)).slice(-2);
    let year : string = value.getFullYear().toString();
    return year + "-" + month + "-" + day;
  }

}
