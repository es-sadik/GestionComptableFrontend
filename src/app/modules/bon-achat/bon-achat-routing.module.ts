import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBonAchatComponent } from './add-edit-bon-achat/add-edit-bon-achat.component';
import { ListBonAchatComponent } from './list-bon-achat/list-bon-achat.component';

const routes: Routes = [
  {
    path:'',
    component:ListBonAchatComponent
  },
  {
    path:'addBonAchat',
    component:AddEditBonAchatComponent
  },
  {
    path:'editBonAchat/:id',
    component:AddEditBonAchatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonAchatRoutingModule { }
