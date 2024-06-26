import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  helpinhos = [
    {
      image: 'assets/images/playstation.jpeg',
      category: 'Games',
      title: 'Comprar um PS5',
      description: 'Meu PS2 queimou e preciso comprar um novo, falta R$ 5000 ps5 pra mim, e',
      avatars: ['assets/images/pessoa1.png', 'assets/images/pessoa1.png', 'assets/images/pessoa1.png'],
      extraAvatars: 5
    },
    // Adicione mais objetos helpinhos conforme necessário
  ];
}
