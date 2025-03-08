import { Component, OnInit } from '@angular/core';  // Importa Component y OnInit desde Angular
import { ActivatedRoute, Router } from '@angular/router';  // Importa ActivatedRoute y Router para manejar rutas
import { ArticleService } from '../../../services/CRUD-Service/article.service';  // Importa el servicio de artículos
import { FormsModule } from '@angular/forms';  // Importa FormsModule para manejar formularios
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas comunes como ngIf, ngFor
import { IArticle } from '../../../interface/article.interface';  // Importa la interfaz que define el artículo

@Component({
  selector: 'app-article-edit',  // Define el selector para el componente
  standalone: true,  // Configura el componente como independiente
  imports: [CommonModule, FormsModule],  // Importa los módulos necesarios para el componente
  templateUrl: './article-edit.component.html',  // Vincula el archivo HTML con el componente
  styleUrls: ['./article-edit.component.css']  // Vincula los estilos CSS con el componente
})

export class ArticleEditComponent implements OnInit {
  // Define un objeto de artículo con valores predeterminados
  article: IArticle = {
    id: 0,  // Inicialmente el id es 0, se actualizará con los datos del artículo
    descripcion: '',  // Descripción vacía por defecto
    precio: 0,  // Precio 0 por defecto
    created_at: '',  // Fecha de creación vacía
    updated_at: ''  // Fecha de actualización vacía
  };

  isLoading = true;  // Define un indicador de carga mientras se obtiene el artículo

  constructor(
    private route: ActivatedRoute,  // Inyecta ActivatedRoute para obtener los parámetros de la ruta
    private articleService: ArticleService,  // Inyecta el servicio de artículos
    private router: Router  // Inyecta el servicio Router para navegar entre rutas
  ) { }

  // Método de ciclo de vida que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));  // Obtiene el ID del artículo desde la URL
    this.articleService.getArticleById(id).subscribe(  // Llama al servicio para obtener los detalles del artículo
      (data) => {
        this.article = data;  // Asigna los datos obtenidos al objeto de artículo
        this.isLoading = false;  // Cambia el estado de carga a falso cuando los datos están listos
      },
      (error) => {
        console.error('Error al cargar el artículo:', error);  // Muestra un error en consola si no se puede obtener el artículo
        this.isLoading = false;  // Cambia el estado de carga a falso en caso de error
      }
    );
  }

  // Método para actualizar un artículo
  updateArticle(): void {
    this.articleService.update(this.article.id, this.article).subscribe(  // Llama al servicio para actualizar el artículo
      (data) => {
        console.log('Artículo actualizado:', data);  // Muestra la respuesta de la actualización
        this.router.navigate(['/articulos']);  // Redirige a la lista de artículos o página deseada
      },
      (error) => {
        console.error('Error al actualizar el artículo:', error);  // Muestra un error en consola si falla la actualización
      }
    );
  }
}
