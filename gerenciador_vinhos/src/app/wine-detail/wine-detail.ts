import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { Router, ActivatedRoute } from '@angular/router';
import { Vinho } from '../models/vinho.model';
import { VinhoService } from '../services/vinho.service';

@Component({
  selector: 'app-wine-detail',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    ButtonModule,
    FieldsetModule
  ],
  templateUrl: './wine-detail.html',
  styleUrl: './wine-detail.css'
})
export class WineDetail {
  private vinhoService = inject(VinhoService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  vinho: Vinho | null = null;
  vinhoNaoEncontrado = false;

  constructor() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const vinhoState = history.state.vinho as Vinho | undefined;

    this.vinho = vinhoState || this.vinhoService.detalhar(id) || null;

    if (!this.vinho) {
      this.vinhoNaoEncontrado = true;
    }
  }

  voltar() {
    this.router.navigate(['/vinhos']);
  }

  editar() {
    if (this.vinho) {
      this.router.navigate(['/vinhos', this.vinho.id, 'editar'], { state: { vinho: this.vinho } });
    }
  }
}
