import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { Painel } from './pages/painel/painel';
import { ProjetoService } from './services/projeto-service';

// Um id que não existe (apagado, ou escrito à mão no URL) volta a /projetos.
const projetoExiste: CanActivateFn = (rota) => {
  const existe = inject(ProjetoService)
    .projetos()
    .some((projeto) => projeto.id === rota.params['id']);

  return existe || inject(Router).createUrlTree(['/projetos']);
};

export const routes: Routes = [
  { path: '', redirectTo: 'projetos', pathMatch: 'full' },
  { path: 'projetos', component: Painel },
  { path: 'projetos/:id', component: Painel, canActivate: [projetoExiste] },
  { path: '**', redirectTo: 'projetos' },
];
