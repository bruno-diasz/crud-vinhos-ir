import { Injectable, signal } from '@angular/core';
import { Vinho } from '../models/vinho.model';

@Injectable({ providedIn: 'root' })
export class VinhoService {
  private vinhos = signal<Vinho[]>([
    { id: 1, nome: 'Bons Ventos', preco: 52.99, tipo: 'Seco', disponivel: true },
  ]);
  private nextId = 2;

  tipos = ['Suave', 'Seco', 'Branco', 'Tinto'];

  listar() {
    return this.vinhos;
  }

  detalhar(id: number): Vinho | undefined {
    return this.vinhos().find(v => v.id === id);
  }

  inserir(vinho: Vinho): void {
    const novo: Vinho = { ...vinho, id: this.nextId++ };
    this.vinhos.update(lista => [...lista, novo]);
  }

  atualizar(vinho: Vinho): void {
    this.vinhos.update(lista => lista.map(v => v.id === vinho.id ? vinho : v));
  }

  remover(id: number): void {
    this.vinhos.update(lista => lista.filter(v => v.id !== id));
  }
}
