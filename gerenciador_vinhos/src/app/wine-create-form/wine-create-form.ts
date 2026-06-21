import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormField, form, required, min } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { signal } from '@angular/core';
import { Vinho } from '../models/vinho.model';

@Component({
  selector: 'app-wine-create-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormField,
    ButtonModule,
    FieldsetModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    ToggleButtonModule,
    ToastModule
  ],
  templateUrl: './wine-create-form.html',
  styleUrl: './wine-create-form.css',
  providers: [MessageService]
})
export class WineCreateForm {
  @Input() tipos: string[] = [];
  @Output() vinhoSalvo = new EventEmitter<Vinho>();

  messageService = inject(MessageService);

  vinho = signal<Vinho>({
    id: 0,
    nome: '',
    preco: 0,
    disponivel: false,
    tipo: 'Suave',
  });

  vinhoForm = form(this.vinho, (schemaPath) => {
    required(schemaPath.nome, { message: 'O nome do vinho é obrigatório.' });
    required(schemaPath.preco, { message: 'O preço do vinho é obrigatório.' });
    min(schemaPath.preco, 0.01, { message: 'O preço deve ser maior que zero.' });
  });

  save() {
    if (this.vinhoForm().valid()) {
      const novoVinho: Vinho = {
        id: 0,
        nome: this.vinhoForm.nome().value(),
        preco: this.vinhoForm.preco().value(),
        tipo: this.vinhoForm.tipo().value(),
        disponivel: this.vinhoForm.disponivel().value()
      };
      this.vinhoSalvo.emit(novoVinho);
      this.cleanForm();
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Vinho adicionado com sucesso' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Verifique os campos obrigatórios' });
    }
  }

  cleanForm() {
    this.vinhoForm.nome().value.set('');
    this.vinhoForm.preco().value.set(0);
    this.vinhoForm.tipo().value.set('Suave');
    this.vinhoForm.disponivel().value.set(false);
  }
}
