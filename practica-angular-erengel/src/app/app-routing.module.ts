import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de los componentes que serán utilizados en las rutas
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BusquedaApiComponent } from './components/busqueda-api/busqueda-api.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';

// CRUD: Componentes relacionados con la gestión de artículos
import { ArticleListComponent } from './components/CRUD/article-list/article-list.component';
import { ArticleCreateComponent } from './components/CRUD/article-add/article-add.component';
import { ArticleEditComponent } from './components/CRUD/article-edit/article-edit.component';

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: '', component: BienvenidaComponent },  // Ruta de inicio, muestra el componente de bienvenida
  { path: 'busqueda', component: BusquedaApiComponent },  // Ruta para buscar en la API
  { path: 'acerca-de', component: AcercaDeComponent },  // Ruta para mostrar información acerca de la app
  { path: 'article-list', component: ArticleListComponent },  // Ruta para listar artículos
  { path: 'article-add', component: ArticleCreateComponent },  // Ruta para crear artículos
  { path: 'article-edit/:id', component: ArticleEditComponent },  // Ruta para editar un artículo, usando un id
  { path: '**', component: PaginaNoEncontradaComponent },  // Ruta para manejar errores 404, cuando no se encuentra una ruta
  { path: '', redirectTo: '/article-list', pathMatch: 'full' }  // Redirección por defecto a la lista de artículos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Importa y configura las rutas en el módulo
  exports: [RouterModule]  // Exporta RouterModule para que pueda ser utilizado en toda la aplicación
})
export class AppRoutingModule { }  // Clase que define el módulo de enrutamiento de la app
