import {Component, OnInit} from '@angular/core';
import {DocenteService} from "../../../../app-core/src/lib/services/docente-service";
import {DocenteDetalheDTO} from "../../../../app-core/src/lib/dto/DocenteDetalhe.dto";

@Component({
  selector: 'app-visualizar-docente-encargos',
  templateUrl: './visualizar-docente-encargos.component.html',
  styleUrls: ['./visualizar-docente-encargos.component.scss']
})
export class VisualizarDocenteEncargosComponent implements OnInit {
  listaDocentesDetalhados: DocenteDetalheDTO[] = [];

  constructor(private docenteService: DocenteService) {}

  ngOnInit(): void {
    this.carregarDados();
  }
  trackByDocenteId(index: number, item: DocenteDetalheDTO) {
    return item.idDocente;
  }

  carregarDados(): void {
    this.docenteService.listarTodosDetalhado().subscribe({
      next: (detalhes) => {
        this.listaDocentesDetalhados = detalhes.filter(d => !!d);
      },
      error: (err) => console.error('Erro ao carregar detalhes', err)
    });
  }

  getNomesAreas(subAreas: any[]): string[] {
    if (!subAreas) return [];
    return Array.from(new Set(subAreas.map(sub => sub.nomeArea)));
  }
}
