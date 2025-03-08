import { Injectable } from '@angular/core';  // Importa la clase Injectable para permitir la inyección de dependencias
import { HttpClient, HttpParams } from '@angular/common/http';  // Importa HttpClient para hacer peticiones HTTP y HttpParams para gestionar parámetros en la URL
import { Observable } from 'rxjs';  // Importa Observable, necesario para trabajar con flujos de datos asincrónicos
import { catchError } from 'rxjs/operators';  // Importa el operador catchError para manejar errores en las peticiones HTTP

@Injectable({
  providedIn: 'root'  // Define que el servicio estará disponible en toda la aplicación
})

// Clase que proporciona métodos para obtener noticias
export class NewsService {
  private apiKey = 'cfc52aff853c423189576fe444a57aab';  // Define la clave de la API para acceder a los servicios de noticias
  private apiUrl = 'https://newsapi.org/v2/everything';  // URL base de la API de noticias

  constructor(private http: HttpClient) { }  // Inyección del servicio HttpClient para realizar las peticiones HTTP

  // searchNews(query: string): Observable<any> {
  //   const params = new HttpParams()
  //     .set('q', query)
  //     .set('apiKey', this.apiKey);

  //   return this.http.get<any>(this.apiUrl, { params });
  // }

  // Método para obtener todas las noticias
  getNews(country: string = 'us'): Observable<any> {  // Parámetro opcional 'country' con valor por defecto 'us' (Estados Unidos)
    return this.http.get(`${this.apiUrl}?country=${country}&apiKey=${this.apiKey}`)  // Realiza una petición GET con los parámetros adecuados
      .pipe(
        catchError(error => {  // Captura cualquier error que ocurra durante la petición HTTP
          console.error('Error al obtener las noticias:', error);  // Muestra el error en la consola
          throw error;  // Lanza el error para que lo maneje el componente o servicio que lo consuma
        })
      );
  }

  // Método para obtener noticias por categoría
  getNewsByCategory(category: string, country: string = 'us'): Observable<any> {  // Parámetros 'category' y 'country'
    return this.http.get(`${this.apiUrl}?category=${category}&country=${country}&apiKey=${this.apiKey}`)  // Realiza la petición GET con parámetros de categoría y país
      .pipe(
        catchError(error => {  // Captura cualquier error de la petición HTTP
          console.error('Error al obtener noticias por categoría:', error);  // Muestra el error en la consola
          throw error;  // Lanza el error para ser manejado por el componente o servicio
        })
      );
  }
}
