import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, PerfilCompleto, UsuarioAutenticado } from '../models/usuario';
@Injectable({ providedIn: 'root' })
export class AuthService {
private http = inject(HttpClient);
private readonly API_LOGIN = 'https://dummyjson.com/auth/login';
private readonly API_PERFIL = 'https://dummyjson.com/auth/me';
private readonly CHAVE_SESSAO = 'dummyjson-usuario';
private usuario = signal<UsuarioAutenticado | null>(this.carregarSessaoSalva());
usuarioAtual = computed(() => this.usuario());
estaAutenticado = computed(() => this.usuario() !== null);
login(credenciais: Login) {
return this.http.post<UsuarioAutenticado>(this.API_LOGIN, credenciais);
}
buscarPerfilCompleto() {
return this.http.get<PerfilCompleto>(this.API_PERFIL);
}
salvarSessao(usuario: UsuarioAutenticado) {
this.usuario.set(usuario);
sessionStorage.setItem(this.CHAVE_SESSAO, JSON.stringify(usuario));
}
logout() {
this.usuario.set(null);
sessionStorage.removeItem(this.CHAVE_SESSAO);
}
obterToken(): string | null {
return this.usuario()?.accessToken ?? null;
}
private carregarSessaoSalva(): UsuarioAutenticado | null {
const dadosSalvos = sessionStorage.getItem(this.CHAVE_SESSAO);
if (!dadosSalvos) {
return null;
}
try {
return JSON.parse(dadosSalvos) as UsuarioAutenticado;
} catch {
return null;
}
}
}