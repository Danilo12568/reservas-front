import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompradoresComponent } from './compradores/compradores.component';
import { EventosComponent } from './eventos/eventos.component';
import { ReservasComponent } from './reservas/reservas.component';

const routes: Routes = [
  { path: 'compradores', component: CompradoresComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: '**', redirectTo: 'reservas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
