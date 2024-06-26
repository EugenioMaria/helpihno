import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unlogged-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './unlogged-page.component.html',
  styleUrl: './unlogged-page.component.scss'
})
export class UnloggedPageComponent {
  @Input() contentTemplate!: TemplateRef<any>;
}
