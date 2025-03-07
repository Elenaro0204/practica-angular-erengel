import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleResponse } from '../../interface/article-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://apiproyecto016.iesruizgijon.es/api/articulos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(this.apiUrl); // Cambia el tipo a ArticleResponse
  }

  // article.service.ts
  getArticleById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;  // Asegúrate de que esta sea la URL correcta para obtener el artículo por ID
    return this.http.get(url);  // Realiza una solicitud GET
  }

  create(article: any): Observable<any> {
    return this.http.post(this.apiUrl, article);
  }

  update(id: number, article: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, article);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
