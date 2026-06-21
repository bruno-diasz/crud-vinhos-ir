import { Component, signal, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { WineCreateForm } from './wine-create-form/wine-create-form';
import { WineTable } from './wine-table/wine-table';
import { WineModalEdit } from './wine-modal-edit/wine-modal-edit';
import { Vinho } from './models/vinho.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToastModule,
    WineCreateForm,
    WineTable,
    WineModalEdit
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [MessageService]
})
export class App {
  // Persistencia
  vinhos = signal<Vinho[]>([
    { id: 1, nome: 'Bons Ventos', preco: 52.99, tipo: 'Seco', disponivel: true },
  ]);

  tipos: string[] = ['Suave', 'Seco', 'Branco', 'Tinto'];
  nextId: number = 2;

  vinhoEmEdicao = signal<Vinho | null>(null);
  modalVisible = signal<boolean>(false);

  messageService = inject(MessageService);

  // Métodos
  onVinhoSalvo(vinho: Vinho) {
    const novoVinho: Vinho = {
      ...vinho,
      id: this.nextId
    };
    this.vinhos.update(vinhos => [...vinhos, novoVinho]);
    this.nextId++;
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Vinho adicionado com sucesso' });
  }

  onEditar(vinho: Vinho) {
    this.vinhoEmEdicao.set(vinho);
    this.modalVisible.set(true);
  }

  onDeletar(id: number) {
    this.vinhos.update(vinhos => vinhos.filter(item => item.id != id));
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Vinho excluído com sucesso' });
  }

  onVinhoAtualizado(vinho: Vinho) {
    this.vinhos.update(vinhos => 
      vinhos.map(v => v.id == vinho.id ? vinho : v)
    );
    this.vinhoEmEdicao.set(null);
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Vinho editado com sucesso' });
  }
}