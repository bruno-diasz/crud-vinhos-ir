import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Vinho } from '../models/vinho.model';
import { VinhoService } from '../services/vinho.service';

@Component({
  selector: 'app-wine-table',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    ButtonModule,
    TableModule,
    ConfirmDialogModule
  ],
  templateUrl: './wine-table.html',
  styleUrl: './wine-table.css',
  providers: [ConfirmationService]
})
export class WineTable {
  private vinhoService = inject(VinhoService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  vinhos = this.vinhoService.listar();

  showDetail(vinho: Vinho) {
    this.router.navigate(['/vinhos', vinho.id], { state: { vinho } });
  }

  showUpdateDialog(vinho: Vinho) {
    this.router.navigate(['/vinhos', vinho.id, 'editar'], { state: { vinho } });
  }

  showDeleteDialog(event: Event, vinho: Vinho) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Tem certeza que deseja excluir o vinho <b>"${vinho.nome}"</b>?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger'
      },
      accept: () => {
        this.vinhoService.remover(vinho.id);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Vinho excluído com sucesso' });
      }
    });
  }
}
