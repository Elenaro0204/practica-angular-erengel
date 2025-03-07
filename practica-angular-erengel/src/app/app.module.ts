import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';  // Para las peticiones HTTP
import { FormsModule } from '@angular/forms';  // Para usar ngModel
import { RouterModule } from '@angular/router';  // Import RouterModule


import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BusquedaApiComponent } from './components/busqueda-api/busqueda-api.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { NewsService } from './services/news.service';  // Asegúrate de importar el servicio
import { DateFormatPipe } from './pipe/date-format.pipe';  // Importa tu pipe personalizada

// CRUD
import { NewsListComponent } from './components/news-list/news-list.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    AcercaDeComponent,
    PaginaNoEncontradaComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BusquedaApiComponent,
    NewsListComponent,
    CategoryFilterComponent,
    DateFormatPipe,
    RouterModule
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
