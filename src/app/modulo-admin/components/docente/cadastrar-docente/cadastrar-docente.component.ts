import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DepartamentoDTO} from "../../../../app-core/src/lib/dto/Departamento.dto";
import {DocenteService} from "../../../../app-core/src/lib/services/docente-service";
import {DepartamentoService} from "../../../../app-core/src/lib/services/departamento-service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastrar-docente',
  templateUrl: './cadastrar-docente.component.html',
  styleUrls: ['./cadastrar-docente.component.scss']
})
export class CadastrarDocenteComponent implements OnInit {
  docenteForm!: FormGroup;
  departamentos: DepartamentoDTO[] = [];

  constructor(
    public fb: FormBuilder,
    private docenteService: DocenteService,
    private departamentoService: DepartamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDepartamentos();
  }

  private initForm() {
    this.docenteForm = this.fb.group({
      nome: ['', Validators.required],
      matricula: ['', Validators.required],
      tipoVaga: [null, Validators.required],
      tipoFormacao: [null, Validators.required],
      licenciatura: [false, Validators.required],
      origemVaga: [null, Validators.required],
      departamento: ['', Validators.required],
    });
  }

  loadDepartamentos(): void {
    this.departamentoService.getAll().subscribe(data => {
      this.departamentos = data;
    });
  }

  get c() {
    return this.docenteForm.controls as { [key: string]: FormControl };
  }

  onSubmit(): void {
    if (this.docenteForm.valid) {
      this.docenteService.create(this.docenteForm.value).subscribe({
        next: () => {
          void Swal.fire('Sucesso', 'Docente cadastrado com sucesso!', 'success');
          void this.router.navigate(['/docente']);
        },
        error: (erro) => {
          console.error('Erro:', erro);
          void Swal.fire('Erro', 'Erro ao salvar docente. Verifique os dados.', 'error');
        }
      });
    } else {
      void Swal.fire('Atenção', 'Preencha todos os campos obrigatórios.', 'warning');
      this.docenteForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    void this.router.navigate(['/docente']);
  }
}
