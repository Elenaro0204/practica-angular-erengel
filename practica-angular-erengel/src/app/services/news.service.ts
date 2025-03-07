import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// Clase que proporciona métodos para obtener noticias
export class NewsService {
  private apiKey = 'cfc52aff853c423189576fe444a57aab';
  private apiUrl = 'https://newsapi.org/v2/everything';

  constructor(private http: HttpClient) { }

  // searchNews(query: string): Observable<any> {
  //   const params = new HttpParams()
  //     .set('q', query)
  //     .set('apiKey', this.apiKey);

  //   return this.http.get<any>(this.apiUrl, { params });
  // }

  // Método para obtener todas las noticias
  getNews(country: string = 'us'): Observable<any> {
    return this.http.get(`${this.apiUrl}?country=${country}&apiKey=${this.apiKey}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener las noticias:', error);
          throw error; // O puedes retornar un Observable con un error específico
        })
      );
  }

  // Método para obtener noticias por categoría
  getNewsByCategory(category: string, country: string = 'us'): Observable<any> {
    return this.http.get(`${this.apiUrl}?category=${category}&country=${country}&apiKey=${this.apiKey}`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener noticias por categoría:', error);
          throw error; // O puedes retornar un Observable con un error específico
        })
      );
  }
}
