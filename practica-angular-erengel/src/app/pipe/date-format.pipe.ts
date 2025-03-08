import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string, format: string = 'DD/MM/YYYY'): string {
    if (!value) return '';

    let date = new Date(value);

    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque enero es 0
    let year = date.getFullYear();

    if (format === 'DD/MM/YYYY') {
      return `${day}/${month}/${year}`;
    } else if (format === 'MM-DD-YYYY') {
      return `${month}-${day}-${year}`;
    } else if (format === 'YYYY/MM/DD') {
      return `${year}/${month}/${day}`;
    } else {
      return value; // Si el formato no es válido, devuelve la fecha original
    }
  }
}
