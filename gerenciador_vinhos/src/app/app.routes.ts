import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login';
import { WineTable } from './wine-table/wine-table';
import { WineCreateForm } from './wine-create-form/wine-create-form';
import { WineDetail } from './wine-detail/wine-detail';
import { WineModalEdit } from './wine-modal-edit/wine-modal-edit';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/vinhos', pathMatch: 'full' },
  { path: 'vinhos', component: WineTable, canActivate: [authGuard] },
  { path: 'vinhos/novo', component: WineCreateForm, canActivate: [authGuard] },
  { path: 'vinhos/:id', component: WineDetail, canActivate: [authGuard] },
  { path: 'vinhos/:id/editar', component: WineModalEdit, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },
];
