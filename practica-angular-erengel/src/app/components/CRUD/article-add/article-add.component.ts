import { Component } from '@angular/core';  // Importa Component desde Angular
import { ArticleService } from '../../../services/CRUD-Service/article.service';  // Importa el servicio para manejar artículos
import { FormsModule } from '@angular/forms';  // Importa FormsModule para manejar formularios
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas comunes como ngIf, ngFor
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-add',  // Define el selector para el componente
  standalone: true,  // Configura el componente como independiente
  imports: [CommonModule, FormsModule],  // Importa módulos necesarios para el componente
  templateUrl: './article-add.component.html',  // Vincula el archivo HTML con el componente
  styleUrls: ['./article-add.component.css']  // Vincula los estilos CSS con el componente
})

export class ArticleCreateComponent {
  // Propiedades para la descripción, precio y estado de carga
  descripcion = '';
  precio = 0;
  loading = false;  // Indica si la solicitud está en proceso de carga

  // Inyección de dependencias para el servicio de artículos y el router
  constructor(private ArticleService: ArticleService, private router: Router) { }

  // Método para enviar los datos del artículo
  enviarArticulo() {
    // Si ya está en proceso de carga, no hacer nada (evitar solicitudes duplicadas)
    if (this.loading) {
      return;
    }

    // Activar el estado de carga (muestra una indicación de que la solicitud está en proceso)
    this.loading = true;

    // Llamada al servicio para crear el artículo, pasando la descripción y el precio
    this.ArticleService.crearArticulo(this.descripcion, this.precio).subscribe(
      response => {
        // Si la solicitud es exitosa, mostrar la respuesta de la API en la consola
        console.log('Respuesta de la API:', response);
        console.log('Artículo añadido:', response);

        // Redirigir al usuario a la lista de artículos después de añadir el nuevo artículo
        this.router.navigate(['/article-list']);
      },
      error => {
        // Si ocurre un error, mostrar el mensaje de error en la consola
        console.error('Error en la solicitud:', error);

        // Si hay detalles adicionales sobre el error, mostrarlos también
        if (error.error) {
          console.error('Detalles del error:', error.error);
        }
      },
      () => {
        // Desactivar el estado de carga cuando la solicitud finalice (ya sea con éxito o error)
        this.loading = false;
      }
    );
  }
}

