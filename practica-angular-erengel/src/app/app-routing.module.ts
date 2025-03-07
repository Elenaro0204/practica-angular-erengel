import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BusquedaApiComponent } from './components/busqueda-api/busqueda-api.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';

// CRUD
import { ArticleListComponent } from './components/CRUD/article-list/article-list.component';
import { ArticleCreateComponent } from './components/CRUD/article-add/article-add.component';
import { ArticleEditComponent } from './components/CRUD/article-edit/article-edit.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'busqueda', component: BusquedaApiComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: 'article-list', component: ArticleListComponent },
  { path: 'article-add', component: ArticleCreateComponent },
  { path: 'article-edit/:id', component: ArticleEditComponent },
  { path: '**', component: PaginaNoEncontradaComponent },
  { path: '', redirectTo: '/article-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
