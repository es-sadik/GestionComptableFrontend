import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProduitComponent } from './add-edit-produit/add-edit-produit.component';

import { ListProduitComponent } from './list-produit/list-produit.component';

const routes: Routes = [
  {
    path: '',
    component:ListProduitComponent

  },
  {
    path:'addProduit',
    component:AddEditProduitComponent
  },
  {
    path:'editProduit/:reference',
    component:AddEditProduitComponent
  },
  {
    path :'categorie',
    loadChildren:() =>import('./categorie/categorie.module').then(m => m.CategorieModule)
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
