import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { PerfilCompleto } from '../../core/models/usuario';
@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  private authService = inject(AuthService);
  private router = inject(Router);
  usuario = this.authService.usuarioAtual;
  perfilCompleto = signal<PerfilCompleto | null>(null);
  carregando = signal(true);
  erro = signal('');
  constructor() {
    this.carregarPerfilCompleto();
  }
  carregarPerfilCompleto() {
    this.carregando.set(true);
    this.erro.set('');
    this.authService.buscarPerfilCompleto().subscribe({
      next: (perfil) => {
        this.perfilCompleto.set(perfil);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível confirmar sua sessão com a API. Tente novamente.');
        this.carregando.set(false);
      },
    });
  }
  sair() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
