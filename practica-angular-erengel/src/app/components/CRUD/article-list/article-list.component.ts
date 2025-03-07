import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/CRUD-Service/article.service';
import { IArticle } from '../../../interface/article.interface';

@Component({
  selector: 'app-article-list',
  standalone: false,
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  articles: IArticle[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();  // Llamada al método loadArticles
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe(
      (data) => {
        console.log(data);  // Esto te mostrará la respuesta de la API en la consola
        this.articles = data.articulos;
      },
      (error) => {
        console.error('Error al cargar artículos:', error);
      }
    );
  }

  getArticles(): void {
    this.articleService.getAll().subscribe(
      (data) => {
        console.log(data); // Verifica que los datos son correctos
        this.articles = data.articulos; // Asegúrate de usar la propiedad correcta
      },
      (error) => {
        console.error('Error al cargar los artículos', error);
      }
    );
  }

  deleteArticle(id: number): void {
    this.articleService.delete(id).subscribe(
      () => {
        // Lógica después de eliminar el artículo
        this.loadArticles(); // Volver a cargar los artículos después de eliminar uno
      },
      (error) => {
        console.error('Error al eliminar el artículo:', error);
      }
    );
  }
}
