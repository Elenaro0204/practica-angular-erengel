import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../pipe/date-format.pipe';

@Component({
  selector: 'app-busqueda-api',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busqueda-api.component.html',
  styleUrls: ['./busqueda-api.component.css'],
  providers: [DateFormatPipe] // Importante para usar DatePipe en TypeScript
})

// Formato del Articulo
// {
//   "source": {
//     "id": "the-verge",
//       "name": "The Verge"
//   },
//   "author": "Todd Haselton",
//     "title": "All the news from Amazon’s AI Alexa event",
//       "description": "The Verge is live blogging Amazon’s big Alexa event in New York City. It kicks off at 10AM ET on February 26th, and we’re expecting the company to announce a new subscription-based version of Alexa that’s beefed up with a bunch of AI features. It seems like a…",
//         "url": "https://www.theverge.com/news/618262/amazon-alexa-event-2025-ai-echo-products-news",
//           "urlToImage": "https://platform.theverge.com/wp-content/uploads/sites/2/2025/02/Alexa-teaser-image-2.png?quality=90&strip=all&crop=0%2C8.7560957155298%2C100%2C82.48780856894&w=1200",
//             "publishedAt": "2025-02-26T14:17:10Z",
//               "content": "The Verge is live blogging Amazons big Alexa event in New York City. It kicks off at 10AM ET on February 26th, and were expecting the company to announce a new subscription-based version of Alexa tha… [+2950 chars]"
// },

export class BusquedaApiComponent {
  query: string = ''; // Termino de búsqueda
  category: string = ''; // Filtro por categoría
  date: string = ''; // Filtro por fecha
  source: string = ''; // Filtro por fuente
  language: string = ''; // Filtro por lenguaje
  author: string = ''; // Filtro por autor
  sortBy: string = 'publishedAt'; // Ordenar por fecha por defecto

  articles: any[] = []; // Almacenar resultados de búsqueda
  displayedArticles: any[] = []; // Artículos a mostrar por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Número total de páginas
  apiKey: string = 'cfc52aff853c423189576fe444a57aab'; // API Key
  articlesPerPage: number = 10; // Artículos por página

  constructor(private datePipe: DateFormatPipe) { }

  // Método para realizar la búsqueda
  onSearch() {
    if (!this.query && !this.category && !this.date && !this.source && !this.language && !this.author) {
      alert('Por favor, ingresa al menos un filtro para la búsqueda');
      return;
    }

    let url = `https://newsapi.org/v2/everything?apiKey=${this.apiKey}`;

    if (this.query) {
      url += `&q=${this.query}`;
    } else {
      url += `&q=news`; // Valor por defecto
    }

    if (this.author) {
      url += `&author=${encodeURIComponent(this.author)}`;
    }

    if (this.date) {
      let formattedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
      url += `&from=${formattedDate}&to=${formattedDate}`; // Buscar solo en un día exacto
    }

    if (this.source) {
      url += `&sources=${encodeURIComponent(this.source)}`;
    }

    if (this.language) {
      url += `&language=${this.language}`;
    }

    if (this.sortBy) {
      url += `&sortBy=${this.sortBy}`;
    }

    console.log('URL de búsqueda:', url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          this.articles = data.articles;

          if (this.articles.length === 0) {
            alert('No se encontraron artículos que coincidan con la búsqueda.');
          } else {
            this.totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
            this.updateDisplayedArticles();
          }
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
