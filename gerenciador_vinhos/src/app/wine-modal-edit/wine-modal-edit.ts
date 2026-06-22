import { Component, inject, signal, OnInit } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { Vinho } from '../models/vinho.model';
import { VinhoService } from '../services/vinho.service';

@Component({
  selector: 'app-wine-modal-edit',
  standalone: true,
  imports: [
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
  templateUrl: './wine-modal-edit.html',
  styleUrl: './wine-modal-edit.css'
})
export class WineModalEdit implements OnInit {
  private vinhoService = inject(VinhoService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  tipos = this.vinhoService.tipos;
  idEmEdicao: number | null = null;
  carregando = true;
  salvando = false;

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

  ngOnInit() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const vinhoState = history.state?.vinho as Vinho | undefined;

    if (vinhoState) {
      this.popularForm(vinhoState);
      this.carregando = false;
    } else {
      this.vinhoService.detalhar(id).subscribe({
        next: (data) => {
          this.popularForm(data);
          this.carregando = false;
        },
        error: () => {
          this.carregando = false;
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Vinho não encontrado' });
          this.router.navigate(['/vinhos']);
        }
      });
    }
  }

  private popularForm(vinho: Vinho) {
    this.idEmEdicao = vinho.id;
    this.vinhoForm.nome().value.set(vinho.nome);
    this.vinhoForm.preco().value.set(vinho.preco);
    this.vinhoForm.tipo().value.set(vinho.tipo);
    this.vinhoForm.disponivel().value.set(vinho.disponivel);
  }

  update() {
    if (this.idEmEdicao != null && this.vinhoForm().valid()) {
      this.salvando = true;
      const vinhoEditado: Vinho = {
        id: this.idEmEdicao,
        nome: this.vinhoForm.nome().value(),
        preco: this.vinhoForm.preco().value(),
        tipo: this.vinhoForm.tipo().value(),
        disponivel: this.vinhoForm.disponivel().value()
      };
      this.vinhoService.atualizar(vinhoEditado).subscribe({
        next: () => {
          this.vinhoService.refreshList();
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Vinho editado com sucesso' });
          this.router.navigate(['/vinhos']);
        },
        error: () => {
          this.salvando = false;
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao editar vinho' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Verifique os campos obrigatórios' });
    }
  }

  cancelar() {
    this.router.navigate(['/vinhos']);
  }
}
