import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { ShowFactureComponent } from './show-facture/show-facture.component';

const routes: Routes = [
  {
    path : '',
    component:ListFactureComponent
  },
  {
    path :'addFacture',
    component :AddFactureComponent
  },
  {
    path : 'showFacture/:id',
    component : ShowFactureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRoutingModule { }
