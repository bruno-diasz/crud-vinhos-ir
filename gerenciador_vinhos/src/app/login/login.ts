import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, PasswordModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  username = '';
  password = '';
  carregando = false;

  login() {
    if (!this.username || !this.password) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos' });
      return;
    }
    this.carregando = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.salvarTokens(res.access, res.refresh);
        const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/vinhos';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.carregando = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário ou senha inválidos' });
      }
    });
  }
}
