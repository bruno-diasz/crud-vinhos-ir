import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ToastModule, ToolbarModule, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
