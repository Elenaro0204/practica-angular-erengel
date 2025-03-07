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
  newArticle: IArticle = {
    id: 0,  // id es usualmente generado por la base de datos
    descripcion: '',
    precio: 0,
    created_at: new Date().toISOString(),  // Asigna la fecha actual
    updated_at: new Date().toISOString()   // Asigna la fecha actual
  };

  constructor(private articleService: ArticleService) {}

  addArticle() {
    this.articleService.create(this.newArticle).subscribe(
      response => {
        console.log('Producto creado con éxito', response);
        // Aquí puedes redirigir a una lista de artículos o limpiar el formulario
      },
      error => {
        console.error('Error al crear producto', error);
      }
    );
  }
}
