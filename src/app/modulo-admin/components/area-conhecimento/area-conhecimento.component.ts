import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AreaConhecimentoDTO} from "../../../app-core/src/lib/dto/AreaConhecimento.dto";
import {AreaConhecimentoService} from "../../../app-core/src/lib/services/area-conhecimento-service";

@Component({
  selector: 'app-area-conhecimento',
  templateUrl: './area-conhecimento.component.html',
  styleUrls: ['./area-conhecimento.component.scss']
})
export class AreaConhecimentoComponent implements OnInit {
  areaForm!: FormGroup;

  areas: any[] = [];

  constructor(public fb: FormBuilder, private areaService: AreaConhecimentoService) {
  }
  trackByAreaId(index: number, item: any) {
    return item.id;
  }
  ngOnInit(): void {
    this.areaForm = this.fb.group({
      nome: ['', Validators.required],
      sigla: ['', Validators.required],
      cargaHoraria: ['', Validators.required],
    });
    this.loadAreas();
  }

  get c() {
    return this.areaForm.controls as { [key: string]: FormControl };
  }

  loadAreas(): void {
    this.areaService.listarTodos().subscribe(data => {
      this.areas = data as AreaConhecimentoDTO[];
    })
  }

  onDelete(id: number): void {
    this.areaService.delete(id).subscribe(res => {})
  }


  onSubmit(): void {
    if (this.areaForm.valid) {
      this.areaService.create(this.areaForm.value).subscribe(
        (resposta) => {
          console.log('Formulário Válido e Submetido:', this.areaForm.value);
          console.log('Resposta do servidor:', resposta);
        },
        (erro) => {
          console.error('Erro ao criar área:', erro);
        }
      );
    } else {
      console.warn('Formulário Inválido. Verifique os campos.');
      this.areaForm.markAllAsTouched();
    }
  }
}
