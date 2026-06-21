import { Component, Input, Output, EventEmitter, model, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormField, form, required, min } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessageService } from 'primeng/api';
import { signal } from '@angular/core';
import { Vinho } from '../models/vinho.model';

@Component({
  selector: 'app-wine-modal-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormField,
    ButtonModule,
    DialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    ToggleButtonModule
  ],
  templateUrl: './wine-modal-edit.html',
  styleUrl: './wine-modal-edit.css',
  providers: [MessageService]
})
export class WineModalEdit {
  @Input() tipos: string[] = [];
  @Input() vinhoEmEdicao: Vinho | null = null;
  visible = model<boolean>(false);
  @Output() vinhoAtualizado = new EventEmitter<Vinho>();

  messageService = inject(MessageService);
  idEmEdicao: number | null = null;

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

  ngOnChanges() {
    if (this.vinhoEmEdicao) {
      this.idEmEdicao = this.vinhoEmEdicao.id;
      this.vinhoForm.nome().value.set(this.vinhoEmEdicao.nome);
      this.vinhoForm.preco().value.set(this.vinhoEmEdicao.preco);
      this.vinhoForm.tipo().value.set(this.vinhoEmEdicao.tipo);
      this.vinhoForm.disponivel().value.set(this.vinhoEmEdicao.disponivel);
    }
  }

  update() {
    if (this.idEmEdicao != null && this.vinhoForm().valid()) {
      const vinhoEditado: Vinho = {
        id: this.idEmEdicao,
        nome: this.vinhoForm.nome().value(),
        preco: this.vinhoForm.preco().value(),
        tipo: this.vinhoForm.tipo().value(),
        disponivel: this.vinhoForm.disponivel().value()
      };
      this.vinhoAtualizado.emit(vinhoEditado);
      this.cleanForm();
      this.visible.set(false);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Vinho editado com sucesso' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Verifique os campos obrigatórios' });
    }
  }

  cleanForm() {
    this.vinhoForm.nome().value.set('');
    this.vinhoForm.preco().value.set(0);
    this.vinhoForm.tipo().value.set('Suave');
    this.vinhoForm.disponivel().value.set(false);
    this.idEmEdicao = null;
  }
}
