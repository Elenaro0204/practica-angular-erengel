export interface IArticle {
  articulo: IArticle;  // Define una interfaz llamada IArticle
  id?: number;  // Propiedad opcional que contiene el ID del artículo, puede ser nulo o no existir en caso de creación
  descripcion: string;  // Propiedad que contiene una descripción del artículo
  precio: number;  // Propiedad que representa el precio del artículo, debe ser un número
}
