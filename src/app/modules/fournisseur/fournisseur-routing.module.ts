import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditFournisseurComponent } from './add-edit-fournisseur/add-edit-fournisseur.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';

const routes: Routes = [
  {
    path: '',
    component: ListFournisseurComponent
  },
  {
    path: 'addFournisseur',
    component: AddEditFournisseurComponent
  },
  {
    path:'editFournisseur/:id',
    component: AddEditFournisseurComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
