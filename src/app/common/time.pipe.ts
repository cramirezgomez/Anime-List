import { Pipe, PipeTransform } from '@angular/core';
import { ignoreElements } from 'rxjs/operators';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string{
    let neg = ''
    if(value < 0){
      neg = '-'
      value *= -1;
    }

    let hours = Math.floor((value / 60));
    let mins = value % 60;
    if(mins < 10){
      return `${neg}${hours}:0${mins}`
    }
    return `${neg}${hours}:${mins}`

  }

}
