import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SubareaConhecimentoDTO} from "../../../app-core/src/lib/dto/SubareaConhecimento.dto";
import {Observable} from "rxjs";
import {AreaConhecimentoDTO} from "../../../app-core/src/lib/dto/AreaConhecimento.dto";
import {SubareaConhecimentoService} from "../../../app-core/src/lib/services/subarea-conhecimento-service";
import {AreaConhecimentoService} from "../../../app-core/src/lib/services/area-conhecimento-service";

@Component({
  selector: 'app-subarea-conhecimento',
  templateUrl: './subarea-conhecimento.component.html',
  styleUrls: ['./subarea-conhecimento.component.scss']
})
export class SubareaConhecimentoComponent implements OnInit {
  subAreaForm!: FormGroup;

  subAreas: any[] = [];

  areasDeConhecimento$!: Observable<AreaConhecimentoDTO[]>;

  constructor(
    public fb: FormBuilder,
    private areaService: SubareaConhecimentoService,
    private areaConhecimentoService: AreaConhecimentoService
  ) {}

  ngOnInit(): void {
    this.subAreaForm = this.fb.group({
      nome: ['', Validators.required],
      sigla: ['', Validators.required],
      cargaHoraria: ['', Validators.required],
      areaConhecimentoId: [null, Validators.required],
    });
    this.loadSubAreas();
    this.areasDeConhecimento$ = this.areaConhecimentoService.listarTodos();
  }
  trackBySubAreaId(index: number, item: any) {
    return item.id;
  }

  loadSubAreas(): void {
    this.areaService.listarTodos().subscribe(data => {
      this.subAreas = data as SubareaConhecimentoDTO[];
    })
  }

  onDelete(id: number): void {
    this.areaService.delete(id).subscribe(data => {})
  }

  get c() {
    return this.subAreaForm.controls as { [key: string]: FormControl };
  }

  onSubmit(): void {
    if (this.subAreaForm.valid) {
      this.areaService.create(this.subAreaForm.value).subscribe(
        (resposta) => {
          console.log('Formulário Válido e Submetido:', this.subAreaForm.value);
          console.log('Resposta do servidor:', resposta);
        },
        (erro) => {
          console.error('Erro ao criar subárea:', erro);
        }
      );
    } else {
      console.warn('Formulário Inválido. Verifique os campos.');
      this.subAreaForm.markAllAsTouched();
    }
  }
}
