import { Component } from '@angular/core';  // Importa Component desde Angular
import { FormsModule } from '@angular/forms';  // Importa FormsModule para formularios reactivos
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas comunes como ngIf, ngFor
import { DateFormatPipe } from '../../pipe/date-format.pipe';  // Importa la clase DateFormatPipe para formatear fechas

@Component({
  selector: 'app-busqueda-api',  // Define el selector del componente
  standalone: true,  // Configura este componente como independiente
  imports: [CommonModule, FormsModule],  // Importa módulos necesarios para el componente
  templateUrl: './busqueda-api.component.html',  // Vincula el template HTML
  styleUrls: ['./busqueda-api.component.css'],  // Vincula los estilos CSS
  providers: [DateFormatPipe]  // Declara el Pipe como proveedor para ser usado dentro de este componente
})

export class BusquedaApiComponent {
  // Propiedades para almacenar los valores de búsqueda y filtros
  query: string = '';  // Término de búsqueda
  category: string = '';  // Filtro por categoría
  date: string = '';  // Filtro por fecha
  source: string = '';  // Filtro por fuente
  language: string = '';  // Filtro por lenguaje
  author: string = '';  // Filtro por autor
  sortBy: string = 'publishedAt';  // Ordenar por fecha por defecto

  // Arreglos para almacenar los artículos obtenidos y los artículos a mostrar en la página actual
  articles: any[] = [];
  displayedArticles: any[] = [];
  currentPage: number = 1;  // Página actual
  totalPages: number = 1;  // Número total de páginas
  apiKey: string = 'cfc52aff853c423189576fe444a57aab';  // API Key para acceder a la API de noticias
  articlesPerPage: number = 10;  // Número de artículos por página

  constructor(private datePipe: DateFormatPipe) { }  // Inyecta el Pipe de formato de fecha en el constructor

  // Método para realizar la búsqueda de noticias
  onSearch() {
    if (!this.query && !this.category && !this.date && !this.source && !this.language && !this.author) {
      alert('Por favor, ingresa al menos un filtro para la búsqueda');
      return;  // Si no se ingresa ningún filtro, muestra un mensaje de alerta
    }

    let url = `https://newsapi.org/v2/everything?apiKey=${this.apiKey}`;  // URL base para la API

    // Agrega los parámetros de búsqueda si existen
    if (this.query) {
      url += `&q=${this.query}`;
    } else {
      url += `&q=news`;  // Si no hay término de búsqueda, por defecto busca "news"
    }

    if (this.author) {
      url += `&author=${encodeURIComponent(this.author)}`;  // Agrega el autor al URL
    }

    if (this.date) {
      let formattedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');  // Formatea la fecha
      url += `&from=${formattedDate}&to=${formattedDate}`;  // Busca solo en el día exacto
    }

    if (this.source) {
      url += `&sources=${encodeURIComponent(this.source)}`;  // Agrega la fuente al URL
    }

    if (this.language) {
      url += `&language=${this.language}`;  // Agrega el lenguaje al URL
    }

    if (this.sortBy) {
      url += `&sortBy=${this.sortBy}`;  // Agrega la opción de ordenación
    }

    console.log('URL de búsqueda:', url);  // Muestra la URL de búsqueda en consola

    // Realiza la solicitud HTTP a la API usando fetch
    fetch(url)
      .then(response => response.json())  // Convierte la respuesta a JSON
      .then(data => {
        if (data.status === 'ok') {
          this.articles = data.articles;  // Almacena los artículos en el array 'articles'

          if (this.articles.length === 0) {
            alert('No se encontraron artículos que coincidan con la búsqueda.');  // Muestra alerta si no se encuentran artículos
          } else {
            this.totalPages = Math.ceil(this.articles.length / this.articlesPerPage);  // Calcula el número total de páginas
            this.updateDisplayedArticles();  // Actualiza los artículos a mostrar en la página actual
          }
        } else {
          console.error('Error en la respuesta de la API:', data.message);  // Muestra un error si la API no responde correctamente
        }
      })
      .catch(error => {
        console.error('Error fetching articles:', error);  // Muestra un error en consola si ocurre un fallo en la solicitud
      });
  }

  // Método para actualizar los artículos que se deben mostrar en la página actual
  updateDisplayedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;  // Calcula el índice de inicio
    const endIndex = startIndex + this.articlesPerPage;  // Calcula el índice de fin
    this.displayedArticles = this.articles.slice(startIndex, endIndex);  // Slicing los artículos para mostrar solo los de la página actual
  }

  // Método para cambiar la página actual
  changePage(page: number) {
    console.log('Cambiando a la página:', page);
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;  // Si la página es válida, actualiza la página actual
      this.updateDisplayedArticles();  // Actualiza los artículos para esa página
      console.log('Página actual:', this.currentPage);
    }
  }
}
