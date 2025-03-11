import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';  // Para las peticiones HTTP a la API
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Para el uso de ngModel y formularios
import { RouterModule } from '@angular/router';  // Necesario para la navegación entre componentes

// Componentes que se usan en la aplicación
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BusquedaApiComponent } from './components/busqueda-api/busqueda-api.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { NewsService } from './services/news.service';  // Servicio para manejar las noticias (si se utiliza en algún componente)
import { DateFormatPipe } from './pipe/date-format.pipe';  // Pipe personalizada para formatear fechas

// CRUD: Componentes y servicio para manejar artículos
import { ArticleListComponent } from './components/CRUD/article-list/article-list.component';
import { ArticleCreateComponent } from './components/CRUD/article-add/article-add.component';
import { ArticleEditComponent } from './components/CRUD/article-edit/article-edit.component';
import { ArticleService } from './services/CRUD-Service/article.service';

@NgModule({
  declarations: [
    AppComponent,  // Componente principal de la aplicación
    BienvenidaComponent,  // Componente de bienvenida
    AcercaDeComponent,  // Componente con información acerca de la app
    PaginaNoEncontradaComponent,  // Componente para mostrar cuando no se encuentra una página
    ArticleListComponent, // Componente para listar artículos
  ],

  imports: [
    BrowserModule,  // Módulo necesario para una aplicación Angular
    AppRoutingModule,  // Módulo de rutas
    FormsModule,  // Módulo necesario para trabajar con formularios
    ReactiveFormsModule,
    RouterModule,  // Módulo para la navegación
    // Añadir otros componentes si es necesario, pero no deberían ir aquí en imports directamente
    RouterModule.forRoot([  // Configuración de rutas para navegación
      { path: 'article-edit/:id', component: ArticleEditComponent }  // Ruta para editar artículos con id
    ]),
  ],
  providers: [NewsService, ArticleService, provideHttpClient()],  // Servicios que se inyectan en los componentes
  bootstrap: [AppComponent]  // Componente principal donde se inicia la aplicación
})

export class AppModule { }  // Exporta el módulo principal de la app
