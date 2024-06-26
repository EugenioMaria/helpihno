import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UnloggedPageComponent } from '../unlogged-page/unlogged-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    UnloggedPageComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpfCnpj: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, cpfCnpj, birthday, password } = this.registerForm.value;
      this.authService.register({
        name: name,
        email: email,
        cpfCnpj: cpfCnpj,
        birthday: birthday,
        password: password
      }).subscribe({
        next: (response) => {
          this.router.navigate(['/login'])
        },
        error: (error) => {

        }
      });
    }
  }
}
