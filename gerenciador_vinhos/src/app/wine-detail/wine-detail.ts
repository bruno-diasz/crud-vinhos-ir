import { Component, inject, OnInit } from '@angular/core';
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
export class WineDetail implements OnInit {
  private vinhoService = inject(VinhoService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  vinho: Vinho | null = null;
  carregando = true;
  vinhoNaoEncontrado = false;

  ngOnInit() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const vinhoState = history.state?.vinho as Vinho | undefined;

    if (vinhoState) {
      this.vinho = vinhoState;
      this.carregando = false;
    } else {
      this.vinhoService.detalhar(id).subscribe({
        next: (data) => {
          this.vinho = data;
          this.carregando = false;
        },
        error: () => {
          this.carregando = false;
          this.vinhoNaoEncontrado = true;
        }
      });
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
