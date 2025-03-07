import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busqueda-api',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busqueda-api.component.html',
  styleUrls: ['./busqueda-api.component.css']
})

export class BusquedaApiComponent {
  query: string = ''; // Termino de búsqueda
  category: string = ''; // Filtro por categoría
  date: string = ''; // Filtro por fecha
  source: string = ''; // Filtro por fuente
  language: string = ''; // Filtro por lenguaje
  articles: any[] = []; // Almacenar resultados de búsqueda
  displayedArticles: any[] = []; // Artículos a mostrar por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Número total de páginas
  apiKey: string = 'cfc52aff853c423189576fe444a57aab'; // API Key
  articlesPerPage: number = 10; // Artículos por página

  // Método para realizar la búsqueda
  onSearch() {
    if (!this.query && !this.category && !this.date && !this.source && !this.language) {
      alert('Por favor, ingresa al menos un filtro para la búsqueda');
      return;
    }

    // Si no se proporciona un término de búsqueda, podemos usar uno por defecto
    let url = `https://newsapi.org/v2/everything?q=${this.query || '*'}&apiKey=${this.apiKey}`;

    // Añadir filtros a la URL si están definidos
    if (this.category) {
      url += `&category=${this.category}`;
    }
    if (this.date) {
      url += `&from=${this.date}`;
    }
    if (this.source) {
      url += `&sources=${this.source}`;
    }
    if (this.language) {
      url += `&language=${this.language}`;
    }

    console.log('URL de búsqueda:', url);  // Verifica que la URL es correcta

    // Llamada a la API para obtener las noticias
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          this.articles = data.articles;
          this.totalPages = Math.ceil(this.articles.length / this.articlesPerPage); // Calcular el número total de páginas
          this.updateDisplayedArticles(); // Actualizar los artículos a mostrar
        } else {
          console.error('Error en la respuesta de la API:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }

  // Actualiza los artículos que se deben mostrar en la página actual
  updateDisplayedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    this.displayedArticles = this.articles.slice(startIndex, endIndex);
  }

  // Cambia la página actual
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedArticles();
    }
  }
}
