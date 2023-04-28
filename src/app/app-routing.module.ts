import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginActivateGuard } from './auth/login-activate.guard';
import { PermissionGuard } from './auth/permission.guard';
import { Error403Component } from './shared/error-pages/error403/error403.component';
import { Error404Component } from './shared/error-pages/error404/error404.component';
import { Error500Component } from './shared/error-pages/error500/error500.component';
import { HomeComponent } from './shared/home/home.component';
import { WelcomePageComponent } from './shared/welcome-page/welcome-page.component';

const routes: Routes = [

  {
    path:'user',
    loadChildren:() =>import('./modules/user/user.module').then(m => m.UserModule),
    canActivate:[LoginActivateGuard]
  },
  {
    
    path:'error500',
    component:Error500Component,
    
  },
  {
    
    path:'error403',
    component:Error403Component,
    
  },
  {
    path:'',
    component: HomeComponent,
    children:[
      {
        path:'',
        component: WelcomePageComponent
      },
      {
        path:'client',
        loadChildren: () =>import('./modules/client/client.module').then(m => m.ClientModule),
        canActivate:[PermissionGuard],
        data:{permissions:['Client']}
      },
      {
        path :'produit',
        loadChildren:() =>import('./modules/produit/produit.module').then(m => m.ProduitModule),
        canActivate:[PermissionGuard],
        data:{permissions:['Produit']}
      },
      {
        path :'fournisseur',
        loadChildren:() =>import('./modules/fournisseur/fournisseur.module').then(m => m.FournisseurModule),
        canActivate:[PermissionGuard],
        data:{permissions:['Fournisseur']}
      },
      {
        path :'bonAchat',
        loadChildren:() =>import('./modules/bon-achat/bon-achat.module').then(m => m.BonAchatModule),
        canActivate:[PermissionGuard],
        data:{permissions:['BonAchat']}
      },
      {
        path :'reglementFournisseur',
        loadChildren:()=>import('./modules/reglement-fournisseur/reglement-fournisseur.module').then(m=>m.ReglementFournisseurModule),
        canActivate:[PermissionGuard],
        data:{permissions:['ReglementFournisseur']}
      },
      {
        path:'bonHonoraire',
        loadChildren:()=>import('./modules/bon-honoraire/bon-honoraire.module').then(m =>m.BonHonoraireModule),
        canActivate:[PermissionGuard],
        data:{permissions:['BonHonoraire']}
      },
      {
        path :'reglementClient',
        loadChildren:()=>import('./modules/reglement-client/reglement-client.module').then(m=>m.ReglementClientModule),
        canActivate:[PermissionGuard],
        data:{permissions:['ReglementClient']}
      },
      {
        path :'facture',
        loadChildren:()=>import('./modules/facture/facture.module').then(m => m.FactureModule),
        canActivate:[PermissionGuard],
        data:{permissions:['Facture']}
      },
      {
        path :'dashboard',
        loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule),
        canActivate:[PermissionGuard],
        data:{permissions:['Dashboard']}
      },
      {
        path :'reglementFournisseur',
        loadChildren:()=>import('./modules/reglement-fournisseur/reglement-fournisseur.module').then(m=>m.ReglementFournisseurModule),
        canActivate:[PermissionGuard],
        data:{permissions:['ReglementFournisseur']}
      },
      {
        path :'admin',
        loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule),
        canActivate:[AuthGuard],
        data:{roles:['Admin']}
      }
      
    ],canActivate:[AuthGuard],
      data:{roles:['User','Admin']} 

    
  },
  { 
    path: '**', 
    pathMatch: 'full',
    component: Error404Component
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
