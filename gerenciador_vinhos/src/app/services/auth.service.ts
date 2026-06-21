import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface TokenResponse {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:8000/api/token/';

  private usuarioLogado = signal<string | null>(null);

  constructor() {
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
      this.usuarioLogado.set(this.obterUsuarioDoToken());
    }
  }

  login(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.apiUrl, { username, password });
  }

  logout(): void {
    if (typeof localStorage !== 'undefined' && typeof localStorage.removeItem === 'function') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    this.usuarioLogado.set(null);
    this.router.navigate(['/login']);
  }

  salvarTokens(access: string, refresh: string): void {
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }
    this.usuarioLogado.set(this.obterUsuarioDoToken());
  }

  getToken(): string | null {
    if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') return null;
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  usuario(): string | null {
    return this.usuarioLogado();
  }

  private obterUsuarioDoToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username || null;
    } catch {
      return null;
    }
  }
}
