import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

// Por defeito o Angular só reaproveita o componente quando a rota é a mesma.
// /projetos e /projetos/:id são duas rotas com o mesmo Painel: sem isto, ao
// passar de "Todos os projetos" para um projeto o Painel era destruído e
// criado de novo, e perdia a pesquisa e o filtro.
export class ReutilizarPainel extends BaseRouteReuseStrategy {
  override shouldReuseRoute(futura: ActivatedRouteSnapshot, atual: ActivatedRouteSnapshot): boolean {
    return futura.routeConfig?.component === atual.routeConfig?.component;
  }
}
