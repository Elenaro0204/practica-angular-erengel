import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../services/CRUD-Service/article.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IArticle } from '../../../interface/article.interface';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  article: IArticle = {
    id: 0,
    descripcion: '',
    precio: 0,
    created_at: '',
    updated_at: ''
  };

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticleById(+id).subscribe((article) => {
        this.article = article;  // Se actualiza con los valores del artículo real
      });
    }
  }

  saveArticle() {
    this.article.updated_at = new Date().toISOString();  // Actualiza la fecha de modificación
    this.articleService.update(this.article.id, this.article).subscribe(
      (response) => {
        console.log('Producto actualizado con éxito', response);
      },
      (error) => {
        console.error('Error al actualizar producto', error);
      }
    );
  }

  // Método para actualizar el artículo
  updateArticle(): void {
    if (this.article) {
      this.articleService.update(this.article.id, this.article).subscribe(
        (updatedArticle) => {
          console.log('Artículo actualizado:', updatedArticle);
        },
        (error) => {
          console.error('Error al actualizar artículo:', error);
        }
      );
    }
  }

}
