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
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID de la URL
    this.articleService.getArticleById(id).subscribe(
      (data) => {
        this.article = data;  // Asignamos los datos obtenidos al formulario
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar el artículo:', error);
        this.isLoading = false;
      }
    );
  }

  // Método para actualizar el artículo
  updateArticle(): void {
    this.articleService.update(this.article.id, this.article).subscribe(
      (data) => {
        console.log('Artículo actualizado:', data);
        this.router.navigate(['/articulos']);  // Redirigir a la lista de artículos o página deseada
      },
      (error) => {
        console.error('Error al actualizar el artículo:', error);
      }
    );
  }

}
