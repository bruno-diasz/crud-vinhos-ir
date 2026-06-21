import { Component, inject, signal } from '@angular/core';
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
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Vinho } from '../models/vinho.model';
import { VinhoService } from '../services/vinho.service';

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
    ToggleButtonModule
  ],
  templateUrl: './wine-create-form.html',
  styleUrl: './wine-create-form.css'
})
export class WineCreateForm {
  private vinhoService = inject(VinhoService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  tipos = this.vinhoService.tipos;

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
      this.vinhoService.inserir(novoVinho);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Vinho adicionado com sucesso' });
      this.router.navigate(['/vinhos']);
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

  cancelar() {
    this.router.navigate(['/vinhos']);
  }
}
