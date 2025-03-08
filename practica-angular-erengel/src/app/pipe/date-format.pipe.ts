import { Pipe, PipeTransform } from '@angular/core';  // Importa las clases necesarias para crear un pipe

@Pipe({
  name: 'dateFormat'  // Define el nombre del pipe como 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  // Implementa la transformación de la fecha según el formato proporcionado
  transform(value: string, format: string = 'DD/MM/YYYY'): string {  // Recibe el valor de la fecha y el formato
    if (!value) return '';  // Si el valor es nulo o vacío, retorna una cadena vacía

    let date = new Date(value);  // Convierte el valor en un objeto Date

    let day = date.getDate().toString().padStart(2, '0');  // Obtiene el día y lo formatea con dos dígitos
    let month = (date.getMonth() + 1).toString().padStart(2, '0');  // Obtiene el mes, sumando 1 porque enero es 0, y lo formatea
    let year = date.getFullYear();  // Obtiene el año completo

    // Dependiendo del formato solicitado, retorna la fecha en el formato adecuado
    if (format === 'DD/MM/YYYY') {
      return `${day}/${month}/${year}`;  // Día/Mes/Año
    } else if (format === 'MM-DD-YYYY') {
      return `${month}-${day}-${year}`;  // Mes-Día-Año
    } else if (format === 'YYYY/MM/DD') {
      return `${year}/${month}/${day}`;  // Año/Mes/Día
    } else {
      return value;  // Si el formato no es válido, retorna la fecha original sin cambios
    }
  }
}
