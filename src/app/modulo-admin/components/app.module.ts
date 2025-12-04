import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocenteComponent } from './docente/docente.component';
import { CadastrarDocenteComponent } from './docente/cadastrar-docente/cadastrar-docente.component';
import { EditarDocenteComponent } from './docente/editar-docente/editar-docente.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormInput} from "../../app-core/src/lib/components/form-input-padrao/form-input-padrao";
import {VisualizarDocenteComponent} from "./docente/visualizar-docente/visualizar-docente.component";
import {DocenteService} from "../../app-core/src/lib/services/docente-service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    DocenteComponent,
    CadastrarDocenteComponent,
    EditarDocenteComponent,
    VisualizarDocenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormInput,
    FormsModule,
    FormInput,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
