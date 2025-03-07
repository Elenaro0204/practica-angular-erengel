// category-filter.component.ts
import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {

  categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  selectedCategory: string = '';

  constructor(private newsService: NewsService) { }

  onCategoryChange(): void {
    if (this.selectedCategory) {
      this.newsService.getNewsByCategory(this.selectedCategory).subscribe(data => {
        // Aquí manejarías el comportamiento al recibir las noticias filtradas
        console.log(data);
      });
    }
  }
}
