export interface Login {
  username: string;
  password: string;
}
export interface UsuarioAutenticado {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
export interface PerfilCompleto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
}
