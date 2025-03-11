import { Component, OnInit } from '@angular/core';  // Importa Component y OnInit desde Angular
import { ArticleService } from '../../../services/CRUD-Service/article.service';  // Importa el servicio para artículos
import { IArticle } from '../../../interface/article.interface';  // Importa la interfaz que define el artículo

@Component({
  selector: 'app-article-list',  // Define el selector para el componente
  standalone: false,  // Configura el componente como no independiente, puede ser parte de un módulo
  templateUrl: './article-list.component.html',  // Vincula el archivo HTML con el componente
  styleUrl: './article-list.component.css',  // Vincula los estilos CSS con el componente
})
export class ArticleListComponent implements OnInit {
  articulos: IArticle[] = [];  // Array vacío donde se almacenarán los artículos

  constructor(private articleService: ArticleService) {}  // Inyecta el servicio de artículos en el constructor

  ngOnInit(): void {
    this.loadArticles();  // Llama al método loadArticles al inicializar el componente
  }

  // Método para cargar todos los artículos
  loadArticles(): void {
    this.articleService.getAll().subscribe(
      (data) => {
        console.log('Datos de la API:', data);  // Verifica si los datos están llegando correctamente
        this.articulos = data.articulos;  // Asigna los artículos a la propiedad
      },
      (error) => {
        console.error('Error al cargar artículos:', error);
      }
    );
  }

  // Método que obtiene los artículos (parecido a loadArticles)
  getArticles(): void {
    this.articleService.getAll().subscribe(
      (data) => {
        console.log(data);  // Muestra la respuesta de la API para verificar los datos
        this.articulos = data.articulos;  // Asigna los artículos obtenidos
      },
      (error) => {
        console.error('Error al cargar los artículos', error);  // Maneja errores
      }
    );
  }

  // Método para eliminar un artículo
  deleteArticle(id: number | undefined): void {
    if (id !== undefined) {
      // Llamada al servicio para eliminar el artículo
      this.articleService.delete(id).subscribe(
        (response) => {
          console.log('Artículo eliminado:', response);
          this.loadArticles();  // Vuelve a cargar los artículos después de eliminar
        },
        (error) => {
          console.error('Error al eliminar artículo:', error);
        }
      );
    } else {
      console.error('El ID del artículo es undefined');
    }
  }
}
