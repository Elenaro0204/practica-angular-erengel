import { Component } from '@angular/core';
import { ArticleService } from '../../../services/CRUD-Service/article.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IArticle } from '../../../interface/article.interface';

@Component({
  selector: 'app-article-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleCreateComponent {
  article: IArticle = {
    id: 0,  // No necesitamos asignar un id, será generado automáticamente por la base de datos
    descripcion: '',
    precio: 0,
    created_at: new Date().toISOString(),  // Asigna la fecha actual
    updated_at: new Date().toISOString()   // Asigna la fecha actual
  };

  constructor(private articleService: ArticleService) {}

  addArticle(): void {
    this.articleService.create(this.article).subscribe(
      (response) => {
        console.log('Artículo añadido con éxito:', response);
      },
      (error) => {
        console.error('Error al añadir el artículo:', error);
        // Mostrar detalles más completos sobre el error
        if (error.status === 500) {
          console.error('Error interno del servidor:', error.message);
          alert('Hubo un error al añadir el artículo. Por favor, inténtalo de nuevo más tarde.');
        }
      }
    );
  }
}
