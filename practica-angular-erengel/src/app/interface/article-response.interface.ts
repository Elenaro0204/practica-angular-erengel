import { IArticle } from "./article.interface";  // Importa la interfaz IArticle para usarla en la respuesta

export interface ArticleResponse {  // Define la interfaz ArticleResponse que representa la estructura de la respuesta
  articulos: IArticle[];  // Propiedad que contiene un array de objetos que siguen la estructura de IArticle
}
