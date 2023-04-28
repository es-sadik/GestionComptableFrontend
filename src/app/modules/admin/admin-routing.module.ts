import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'',
    redirectTo:"profile",
    pathMatch:'full'
    
  },
  {
    path:'gestionComptes',
    children:[
      {
        path:'',
        component: ListUserComponent
      },
      {
        path:'addUser',
        component: AddEditUserComponent
      },
      {
        path:'editUser/:id',
        component: AddEditUserComponent
      },
      {
        path:'deleteUser',
        component: DeleteUserComponent
      }
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
