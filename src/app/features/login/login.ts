import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  carregando = signal(false);
  erro = signal('');
  formulario = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  entrar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.erro.set('Preencha usuário e senha.');
      return;
    }
    this.carregando.set(true);
    this.erro.set('');
    this.authService.login(this.formulario.getRawValue()).subscribe({
      next: (usuario) => {
        this.authService.salvarSessao(usuario);
        this.carregando.set(false);
        this.router.navigateByUrl('/perfil');
      },
      error: (erro: HttpErrorResponse) => {
        this.carregando.set(false);
        this.erro.set(
          erro.status === 400
            ? 'Usuário ou senha inválidos.'
            : 'Não foi possível fazer login. Tente novamente.',
        );
      },
    });
  }
}
