import { Routes } from '@angular/router';
import { WineTable } from './wine-table/wine-table';
import { WineCreateForm } from './wine-create-form/wine-create-form';
import { WineDetail } from './wine-detail/wine-detail';
import { WineModalEdit } from './wine-modal-edit/wine-modal-edit';

export const routes: Routes = [
  { path: '', redirectTo: '/vinhos', pathMatch: 'full' },
  { path: 'vinhos', component: WineTable },
  { path: 'vinhos/novo', component: WineCreateForm },
  { path: 'vinhos/:id', component: WineDetail },
  { path: 'vinhos/:id/editar', component: WineModalEdit },
];
