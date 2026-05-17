import { Component, computed, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals'
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
    DecimalPipe,
    FormField
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
  vinho = signal<Vinho>({
    id: 0,
    nome: '',
    preco: 0,
    disponivel: false,
    tipo: 'Suave',
  })

  vinhoForm = form(this.vinho)
  
  nextId: number = 2;
  tipos: string[] = ['Suave', 'Seco', 'Branco', 'Tinto'];
  idEmEdicao: number | null = null;

  // Dependencias do dialog
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  visible: boolean = false;

  // Validações com computed 
  erroNome = computed(() => {
    const nome = this.vinhoForm.nome().value();
    if (!nome || nome.trim() === '') {
      return 'O nome do vinho é obrigatório.';
    }
    return null;
  });

  erroPreco = computed(() => {
    const preco = this.vinhoForm.preco().value();
    if (preco === null || preco <= 0) {
      return 'O preço deve ser maior que zero.';
    }
    return null;
  });

  formValido = computed(() => {
    return this.erroNome() === null && this.erroPreco() === null;
  });


  // Metodos
  save() {
    if (this.formValido()) {
      this.vinhos.push({
        id: this.nextId,
        nome: this.vinhoForm.nome().value(),
        preco: this.vinhoForm.preco().value(),
        tipo: this.vinhoForm.tipo().value(),
        disponivel: this.vinhoForm.disponivel().value()
      })

      this.cleanForm()
      this.nextId++;
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Vinho adicionado com sucesso` });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Verifique os campos obrigatórios` });
    }
  }

  update() {
    if (this.idEmEdicao != null && this.formValido()) {
      let vinhoEditado: Vinho = {
        id: this.idEmEdicao,
        nome: this.vinhoForm.nome().value(),
        preco: this.vinhoForm.preco().value(),
        tipo: this.vinhoForm.tipo().value(),
        disponivel: this.vinhoForm.disponivel().value()
      };
      this.vinhos = this.vinhos.map(vinho => vinho.id == vinhoEditado.id ? vinhoEditado : vinho);
      this.cleanForm()
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Vinho editado com sucesso` });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Verifique os campos obrigatórios` });
    }
  }

  delete(id: number) {
    this.vinhos = this.vinhos.filter(item => item.id != id);
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Vinho excluido com sucesso` });
  }

  showUpdateDialog(vinho: Vinho) {
    this.visible = true;
    this.idEmEdicao = vinho.id;
    this.vinhoForm.nome().value.set(vinho.nome);
    this.vinhoForm.preco().value.set(vinho.preco);
    this.vinhoForm.tipo().value.set(vinho.tipo);
    this.vinhoForm.disponivel().value.set(vinho.disponivel);
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
        this.delete(vinho.id);
      },
      reject: () => {
      }
    });
  }

  cleanForm() {
    this.vinhoForm.nome().value.set('');
    this.vinhoForm.preco().value.set(0);
    this.vinhoForm.tipo().value.set('Suave');
    this.vinhoForm.disponivel().value.set(false);
    this.idEmEdicao = null;
  }
}