import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ArticleResponse } from '../../interface/article-response.interface';
import { IArticle } from '../../interface/article.interface'; // Asegúrate de importar IArticle

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://apiproyecto016.iesruizgijon.es/api/articulos';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los artículos
  getAll(): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(this.apiUrl);
  }

  // Método para obtener un artículo por su ID
  getArticleById(id: number): Observable<IArticle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IArticle>(url);
  }

  // Método para crear un artículo
  create(article: IArticle): Observable<IArticle> {
    return this.http.post<IArticle>(this.apiUrl, article).pipe(
      catchError(error => {
        console.error('Error en la creación del artículo:', error);
        return throwError(error);  // Propaga el error
      })
    );
  }

  // Método para actualizar un artículo
  update(id: number, article: IArticle): Observable<IArticle> {
    return this.http.put<IArticle>(`${this.apiUrl}/${id}`, article);
  }

  // Método para eliminar un artículo
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
