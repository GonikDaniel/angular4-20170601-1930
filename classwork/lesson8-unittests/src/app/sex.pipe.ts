import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: number): string {
    if( value === 0){
      return 'ж';
    }
    if( value === 1){
      return 'м';
    }
    throw new Error('Input should be only 0 or 1');
  }
}
