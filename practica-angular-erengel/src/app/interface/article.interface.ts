export interface IArticle {  // Define una interfaz llamada IArticle
  id: number;  // Propiedad que representa el identificador único del artículo, debe ser un número
  descripcion: string;  // Propiedad que contiene una descripción del artículo
  precio: number;  // Propiedad que representa el precio del artículo, debe ser un número
  created_at: string;  // Fecha en que se creó el artículo, almacenada como una cadena
  updated_at: string;  // Fecha de la última actualización del artículo, también como una cadena
}
