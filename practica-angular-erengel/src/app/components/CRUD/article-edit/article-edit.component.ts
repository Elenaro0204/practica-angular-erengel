import { Component, OnInit } from '@angular/core';  // Importa Component y OnInit desde Angular
import { ActivatedRoute, Router } from '@angular/router';  // Importa ActivatedRoute y Router para manejar rutas
import { ArticleService } from '../../../services/CRUD-Service/article.service';  // Importa el servicio de artículos
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';  // Importa FormsModule para manejar formularios
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas comunes como ngIf, ngFor
import { IArticle } from '../../../interface/article.interface';  // Importa la interfaz que define el artículo

@Component({
  selector: 'app-article-edit',  // Define el selector para el componente
  standalone: true,  // Configura el componente como independiente
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  // Importa los módulos necesarios para el componente
  templateUrl: './article-edit.component.html',  // Vincula el archivo HTML con el componente
  styleUrls: ['./article-edit.component.css']  // Vincula los estilos CSS con el componente
})

export class ArticleEditComponent implements OnInit {
  articuloForm!: FormGroup; // Formulario reactivo
  articleId!: number; // ID del artículo, recuperado desde la URL
  loading: boolean = true; // Para saber si los datos aún están cargando

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, // Para acceder a los parámetros de la URL
    private router: Router, // Para acceder a los parámetros de la URL
    private articuloService: ArticleService
  ) { }

  ngOnInit(): void {
    // Inicializar el formulario con valores por defecto
    this.articuloForm = this.fb.group({
      // id: [null, Validators.required],  // ID del artículo
      descripcion: ['', Validators.required],  // Descripción
      precio: [0, [Validators.required, Validators.min(1)]]  // Precio
    });

    // Obtener el ID del artículo de la URL
    this.articleId = +this.route.snapshot.paramMap.get('id')!;

    // Llamar al servicio para obtener los detalles del artículo
    // Llamar al servicio para obtener los detalles del artículo
    this.articuloService.getArticleById(this.articleId).subscribe(
      (response) => {
        const articulo = response.articulo; // Acceder al artículo dentro de la respuesta
        this.articuloForm = this.fb.group({
          descripcion: [articulo.descripcion, Validators.required],
          precio: [articulo.precio, [Validators.required, Validators.min(1)]]
        });

        // Establecemos que los datos ya están cargados
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener el artículo', error);
        this.loading = false;
      }
    );
  }

  actualizarArticulo() {
    if (this.articuloForm.valid) {
      //const id = this.articuloForm.value.id; // Recuperar ID del formulario
      // const id = this.route.snapshot.paramMap.get('id');
      // if (id) {
      //   this.articleId = +id; // Convertir el ID a número
      // }
      const datosArticulo = {
        descripcion: this.articuloForm.value.descripcion,
        precio: this.articuloForm.value.precio
      };

      this.articuloService.actualizarArticulo(this.articleId, datosArticulo).subscribe(
        respuesta => {
          console.log("Artículo actualizado:", respuesta);

          // Mostrar alert con el mensaje de éxito
          alert("¡Producto actualizado correctamente!");

          // Redirigir a la página de listado de artículos
          this.router.navigate(['/article-list']);
        },
        error => {
          console.error("Error al actualizar el artículo", error);
        }
      );
    } else {
      console.warn("Formulario inválido");
    }
  }

}
