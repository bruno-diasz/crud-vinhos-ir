import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vinho } from '../models/vinho.model';

@Injectable({ providedIn: 'root' })
export class VinhoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://curly-giggle-5r6gxjq47p4cv7xv-8000.app.github.dev/api/vinhos/';

  private vinhos = signal<Vinho[]>([]);
  private initialized = false;

  tipos = ['Suave', 'Seco', 'Branco', 'Tinto'];

  listar(): WritableSignal<Vinho[]> {
    if (!this.initialized) {
      this.initialized = true;
      this.http.get<Vinho[]>(this.apiUrl).subscribe({
        next: (data) => this.vinhos.set(data),
        error: () => this.vinhos.set([])
      });
    }
    return this.vinhos;
  }

  refreshList(): void {
    this.http.get<Vinho[]>(this.apiUrl).subscribe({
      next: (data) => this.vinhos.set(data),
      error: () => this.vinhos.set([])
    });
  }

  detalhar(id: number): Observable<Vinho> {
    return this.http.get<Vinho>(`${this.apiUrl}${id}/`);
  }

  inserir(vinho: Omit<Vinho, 'id'>): Observable<Vinho> {
    return this.http.post<Vinho>(this.apiUrl, vinho);
  }

  atualizar(vinho: Vinho): Observable<Vinho> {
    return this.http.put<Vinho>(`${this.apiUrl}${vinho.id}/`, vinho);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
