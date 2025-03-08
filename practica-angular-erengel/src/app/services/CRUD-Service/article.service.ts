import { Injectable } from '@angular/core';  // Importa la clase Injectable para permitir la inyección de dependencias
import { HttpClient } from '@angular/common/http';  // Importa HttpClient para realizar peticiones HTTP
import { catchError, Observable, throwError } from 'rxjs';  // Importa operadores y funciones necesarias para manejo de errores y trabajar con observables
import { ArticleResponse } from '../../interface/article-response.interface';  // Importa la interfaz ArticleResponse para la respuesta de los artículos
import { IArticle } from '../../interface/article.interface';  // Importa la interfaz IArticle para el tipo de artículo

@Injectable({
  providedIn: 'root'  // Define que el servicio estará disponible en toda la aplicación
})
export class ArticleService {
  private apiUrl = 'https://apiproyecto016.iesruizgijon.es/api/articulos';  // Define la URL base de la API para los artículos

  constructor(private http: HttpClient) { }  // Inyecta HttpClient para hacer las peticiones HTTP

  // Método para obtener todos los artículos
  getAll(): Observable<ArticleResponse> {  // Retorna un Observable de tipo ArticleResponse
    return this.http.get<ArticleResponse>(this.apiUrl);  // Realiza una petición GET para obtener todos los artículos
  }

  // Método para obtener un artículo por su ID
  getArticleById(id: number): Observable<IArticle> {  // Recibe un ID como parámetro y retorna un Observable de tipo IArticle
    const url = `${this.apiUrl}/${id}`;  // Construye la URL con el ID del artículo
    return this.http.get<IArticle>(url);  // Realiza una petición GET para obtener el artículo con ese ID
  }

  // Método para crear un artículo
  create(article: IArticle): Observable<IArticle> {  // Recibe un objeto IArticle y retorna un Observable de tipo IArticle
    return this.http.post<IArticle>(this.apiUrl, article).pipe(  // Realiza una petición POST para crear un nuevo artículo
      catchError(error => {  // Maneja cualquier error que ocurra durante la petición
        console.error('Error en la creación del artículo:', error);  // Muestra el error en la consola
        return throwError(error);  // Propaga el error para que lo maneje el componente que lo llame
      })
    );
  }

  // Método para actualizar un artículo
  update(id: number, article: IArticle): Observable<IArticle> {  // Recibe un ID y un objeto IArticle para actualizar
    return this.http.put<IArticle>(`${this.apiUrl}/${id}`, article);  // Realiza una petición PUT para actualizar el artículo
  }

  // Método para eliminar un artículo
  delete(id: number): Observable<any> {  // Recibe un ID como parámetro para eliminar un artículo
    return this.http.delete(`${this.apiUrl}/${id}`);  // Realiza una petición DELETE para eliminar el artículo con ese ID
  }
}
