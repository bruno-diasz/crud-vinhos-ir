import { Component } from '@angular/core';


interface Vinho {
  id: number;
  nome: string;
  preco: number;
  tipo: string;
  disponivel: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  // Persistencia
  vinhos: Vinho[] = [
    { id: 1, nome: 'Bons Ventos', preco: 52.99, tipo: 'Seco', disponivel: true },
  ];

  // Campos do formulario
  nextId: number = 2;
  nome: string = '';
  preco: number | null = null;
  tipos: string[] = ['Suave', 'Seco', 'Branco', 'Tinto'];
  disponivel: boolean = false;

  tipoSelected: string = 'Suave';
  idEmEdicao: number | null = null;


}