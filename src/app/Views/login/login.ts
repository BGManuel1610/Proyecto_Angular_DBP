import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../Services/login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginGroup: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginGroup = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginGroup.invalid) {
      this.loginGroup.markAllAsTouched();
      return;
    }
    const url = 'http://localhost:3000/api/v1/login';
    const body = this.loginGroup.value;
    this.loginService.post(url, body).subscribe((data: any) => {
      if (data.ok) {
        Swal.fire({ icon: 'success', title: 'Login exitoso', text: 'Bienvenido' });
      } else {
        Swal.fire({ icon: 'error', title: 'Login inválido', text: 'Usuario o contraseña incorrectos' });
      }
    });
  }
}
