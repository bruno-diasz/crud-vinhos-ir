import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DecimalPipe } from '@angular/common';

interface Vinho {
  id: number;
  nome: string;
  preco: number;
  tipo: string;
  disponivel: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    FormsModule,
    InputNumberModule,
    InputGroupModule,
    InputTextModule,
    SelectModule,
    InputGroupAddonModule,
    ToggleButtonModule,
    FieldsetModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    DecimalPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [ConfirmationService, MessageService]
})
export class App {

  // Persistencia
  vinhos: Vinho[] = [
    { id: 1, nome: 'Bons Ventos', preco: 52.99, tipo: 'Seco', disponivel: true },
  ];

  // Campos do formulario
  nextId: number = 2;
  nome: string = '';
  preco: number | null = null;
  tipos: string[] = ['Suave', 'Seco', 'Branco', 'Tinto'];
  disponivel: boolean = false;

  tipoSelected: string = 'Suave';
  idEmEdicao: number | null = null;

  // Dependencias do dialog
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  visible: boolean = false;

}