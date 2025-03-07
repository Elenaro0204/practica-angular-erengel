import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BusquedaApiComponent } from './components/busqueda-api/busqueda-api.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
// CRUD
import { NewsListComponent } from './components/news-list/news-list.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'busqueda', component: BusquedaApiComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: '**', component: PaginaNoEncontradaComponent },
  { path: 'list', component: NewsListComponent },
  { path: 'category', component: CategoryFilterComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
