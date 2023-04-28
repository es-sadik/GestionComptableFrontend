import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReglementClientComponent } from './add-reglement-client/add-reglement-client.component';
import { ListReglementClientComponent } from './list-reglement-client/list-reglement-client.component';

const routes: Routes = [
  {
    path : '',
    component : ListReglementClientComponent
  },
  {
    path :'addReglementClient',
    component : AddReglementClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglementClientRoutingModule { }
