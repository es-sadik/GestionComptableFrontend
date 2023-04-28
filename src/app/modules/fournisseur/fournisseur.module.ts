import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { FournisseurComponent } from './fournisseur.component';
import { AddEditFournisseurComponent } from './add-edit-fournisseur/add-edit-fournisseur.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { ShowFournisseurComponent } from './show-fournisseur/show-fournisseur.component';
import { DeleteFournisseurComponent } from './delete-fournisseur/delete-fournisseur.component';
import { NotifierModule , NotifierOptions } from 'angular-notifier';

/**
 * Custom angular notifier options
 */

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    FournisseurComponent,
    AddEditFournisseurComponent,
    ListFournisseurComponent,
    ShowFournisseurComponent,
    DeleteFournisseurComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class FournisseurModule { }
