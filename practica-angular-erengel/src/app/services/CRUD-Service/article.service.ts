import { Injectable } from '@angular/core';  // Importa la clase Injectable para permitir la inyección de dependencias
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';  // Importa HttpClient para realizar peticiones HTTP
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

  // Método para crear un artículo (realiza la solicitud POST)
  crearArticulo(descripcion: string, precio: number): Observable<any> {
    const body = new URLSearchParams();
    // Convierte el objeto JSON a cadena
    const jsonData = JSON.stringify({ descripcion, precio });
    body.set('json', jsonData);

    // Configuración de encabezados
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.apiUrl, body.toString(), { headers });
  }

  // Método para actualizar un artículo
  actualizarArticulo(id: number, articulo: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const body = new URLSearchParams();
    body.set('json', JSON.stringify(articulo));

    return this.http.put(`${this.apiUrl}/${id}`, body.toString(), { headers });
  }

  // Método para eliminar un artículo
  delete(id: number): Observable<any> {  // Recibe un ID como parámetro para eliminar un artículo
    return this.http.delete(`${this.apiUrl}/${id}`);  // Realiza una petición DELETE para eliminar el artículo con ese ID
  }
}
