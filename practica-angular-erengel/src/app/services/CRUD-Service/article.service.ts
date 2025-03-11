import { Injectable } from '@angular/core';  // Importa la clase Injectable para permitir la inyección de dependencias
import { HttpClient, HttpHeaders} from '@angular/common/http';  // Importa HttpClient para realizar peticiones HTTP
import {Observable} from 'rxjs';  // Importa operadores y funciones necesarias para manejo de errores y trabajar con observables
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
    // Se crea un nuevo objeto URLSearchParams para enviar los datos como parámetros de formulario
    const body = new URLSearchParams();
    // Convierte el objeto JSON con los datos del artículo en una cadena
    const jsonData = JSON.stringify({ descripcion, precio });
    // Se añade el JSON como parámetro 'json' al body
    body.set('json', jsonData);
    // Configuración de encabezados (se indica que el tipo de contenido es 'application/x-www-form-urlencoded')
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    // Realiza la solicitud POST al servidor, enviando el body con los datos del artículo y los encabezados
    return this.http.post(this.apiUrl, body.toString(), { headers });
  }

  // Método para actualizar un artículo (realiza la solicitud PUT)
  actualizarArticulo(id: number, articulo: any): Observable<any> {
    // Configuración de encabezados, especificando el tipo de contenido como 'application/x-www-form-urlencoded'
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // Se crea un nuevo objeto URLSearchParams para enviar los datos como parámetros de formulario
    const body = new URLSearchParams();
    // Se convierte el objeto artículo a formato JSON y se añade al body
    body.set('json', JSON.stringify(articulo));
    // Realiza la solicitud PUT al servidor, enviando el body con los datos actualizados del artículo y los encabezados
    return this.http.put(`${this.apiUrl}/${id}`, body.toString(), { headers });
  }


  // Método para eliminar un artículo
  delete(id: number): Observable<any> {  // Recibe un ID como parámetro para eliminar un artículo
    return this.http.delete(`${this.apiUrl}/${id}`);  // Realiza una petición DELETE para eliminar el artículo con ese ID
  }
}
