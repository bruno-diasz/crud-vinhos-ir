import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Vinho } from '../models/vinho.model';

@Component({
  selector: 'app-wine-table',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    FormsModule,
    ButtonModule,
    TableModule,
    SelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ToggleButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './wine-table.html',
  styleUrl: './wine-table.css',
  providers: [ConfirmationService]
})
export class WineTable {
  @Input() vinhos: Vinho[] = [];
  @Output() editar = new EventEmitter<Vinho>();
  @Output() deletar = new EventEmitter<number>();

  confirmationService = inject(ConfirmationService);

  showUpdateDialog(vinho: Vinho) {
    this.editar.emit(vinho);
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
        this.deletar.emit(vinho.id);
      },
      reject: () => {
      }
    });
  }
}
