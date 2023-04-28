import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditClientComponent } from './add-edit-client/add-edit-client.component';


import { ListClientComponent } from './list-client/list-client.component';

const routes: Routes = [
  {
    path: '',
    component: ListClientComponent
  },
  {
    path: 'addClient',
    component: AddEditClientComponent
  },
  {
    path:'editClient/:id',
    component: AddEditClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
