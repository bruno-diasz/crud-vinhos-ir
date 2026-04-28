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

  // Metodos
  save() {
    if (this.nome != '' && this.preco != null && this.preco > 0) {
      this.vinhos.push({
        id: this.nextId,
        nome: this.nome,
        preco: this.preco,
        tipo: this.tipoSelected,
        disponivel: this.disponivel
      })

      this.cleanForm()
      this.nextId++;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Vinho adicionado com sucesso` });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Nome e Valor são obrigatorios` });
    }

  }
  update() {
    if (this.idEmEdicao != null && this.nome != '' && this.preco != null && this.preco > 0) {
      let vinhoEditado: Vinho = {
        id: this.idEmEdicao,
        nome: this.nome,
        preco: this.preco,
        tipo: this.tipoSelected,
        disponivel: this.disponivel
      };
      this.vinhos = this.vinhos.map(vinho => vinho.id == vinhoEditado.id ? vinhoEditado : vinho);
      this.cleanForm()
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Vinho editado com sucesso` });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Nome e Valor são obrigatorios` });
    }
  }

  delete(id: number) {
    this.vinhos = this.vinhos.filter(item => item.id != id);
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Vinho excluido com sucesso` });
  }


  cleanForm() {
    this.nome = '';
    this.preco = 0;
    this.tipoSelected = '';
    this.disponivel = false;
    this.idEmEdicao = null;
  }


}