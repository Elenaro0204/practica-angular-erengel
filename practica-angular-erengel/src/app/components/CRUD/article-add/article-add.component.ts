import { Component } from '@angular/core';  // Importa Component desde Angular
import { ArticleService } from '../../../services/CRUD-Service/article.service';  // Importa el servicio para manejar artículos
import { FormsModule } from '@angular/forms';  // Importa FormsModule para manejar formularios
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas comunes como ngIf, ngFor
import { IArticle } from '../../../interface/article.interface';  // Importa la interfaz para definir el tipo de artículo

@Component({
  selector: 'app-article-add',  // Define el selector para el componente
  standalone: true,  // Configura el componente como independiente
  imports: [CommonModule, FormsModule],  // Importa módulos necesarios para el componente
  templateUrl: './article-add.component.html',  // Vincula el archivo HTML con el componente
  styleUrls: ['./article-add.component.css']  // Vincula los estilos CSS con el componente
})

export class ArticleCreateComponent {
  // Define un artículo con valores predeterminados
  article: IArticle = {
    id: 0,  // El ID será generado automáticamente por la base de datos
    descripcion: '',  // Descripción vacía por defecto
    precio: 0,  // Precio 0 por defecto
    created_at: new Date().toISOString(),  // La fecha de creación es la fecha actual
    updated_at: new Date().toISOString()   // La fecha de actualización es la fecha actual
  };

  // Inyecta el servicio ArticleService en el constructor para poder utilizar sus métodos
  constructor(private articleService: ArticleService) {}

  // Método para añadir un artículo
  addArticle(): void {
    // Llama al servicio para crear un artículo y maneja la respuesta
    this.articleService.create(this.article).subscribe(
      (response) => {
        console.log('Artículo añadido con éxito:', response);  // Muestra la respuesta si se añade correctamente
      },
      (error) => {
        console.error('Error al añadir el artículo:', error);  // Muestra el error en consola si ocurre un fallo
        // Muestra detalles más completos sobre el error
        if (error.status === 500) {
          console.error('Error interno del servidor:', error.message);  // Muestra el mensaje si hay un error 500
          alert('Hubo un error al añadir el artículo. Por favor, inténtalo de nuevo más tarde.');  // Alerta al usuario
        }
      }
    );
  }
}
