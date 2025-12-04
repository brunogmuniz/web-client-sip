import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DocenteComponent} from "./docente/docente.component";
import {VisualizarDocenteComponent} from "./docente/visualizar-docente/visualizar-docente.component";
import {CadastrarDocenteComponent} from "./docente/cadastrar-docente/cadastrar-docente.component";
import {EditarDocenteComponent} from "./docente/editar-docente/editar-docente.component";

const routes: Routes = [
  {
    path: 'docente',
    component: DocenteComponent,
    children: [
      { path: '', redirectTo: 'visualizar', pathMatch: 'full' },
      { path: 'visualizar', component: VisualizarDocenteComponent },
      { path: 'novo', component: CadastrarDocenteComponent },
      { path: 'editar/:id', component: EditarDocenteComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
