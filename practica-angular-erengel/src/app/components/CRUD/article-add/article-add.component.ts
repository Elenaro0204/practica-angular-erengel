import { Component } from '@angular/core';  // Importa Component desde Angular
import { ArticleService } from '../../../services/CRUD-Service/article.service';  // Importa el servicio para manejar artículos
import { FormsModule } from '@angular/forms';  // Importa FormsModule para manejar formularios
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas comunes como ngIf, ngFor
import { IArticle } from '../../../interface/article.interface';  // Importa la interfaz para definir el tipo de artículo
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-add',  // Define el selector para el componente
  standalone: true,  // Configura el componente como independiente
  imports: [CommonModule, FormsModule],  // Importa módulos necesarios para el componente
  templateUrl: './article-add.component.html',  // Vincula el archivo HTML con el componente
  styleUrls: ['./article-add.component.css']  // Vincula los estilos CSS con el componente
})

export class ArticleCreateComponent {
  descripcion = '';
  precio = 0;
  loading = false;  // Estado de carga

  constructor(private ArticleService: ArticleService, private router: Router) { }

  // Método para enviar los datos
  enviarArticulo() {
    if (this.loading) {
      return; // Si está en carga, no hacer nada
    }
    this.loading = true;  // Activar carga

    this.ArticleService.crearArticulo(this.descripcion, this.precio).subscribe(
      response => {
        console.log('Respuesta de la API:', response);
        console.log('Artículo añadido:', response);
        this.router.navigate(['/article-list']);
      },
      error => {
        console.error('Error en la solicitud:', error);
        if (error.error) {
          console.error('Detalles del error:', error.error);
        }
      },
      () => {
        this.loading = false; // Desactivar carga al finalizar la solicitud
      }
    );
  }

}
