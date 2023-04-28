import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglementFournisseurRoutingModule } from './reglement-fournisseur-routing.module';
import { ReglementFournisseurComponent } from './reglement-fournisseur.component';
import { AddReglementFournisseurComponent } from './add-reglement-fournisseur/add-reglement-fournisseur.component';
import { DeleteReglementFournisseurComponent } from './delete-reglement-fournisseur/delete-reglement-fournisseur.component';
import { ListReglementFournisseurComponent } from './list-reglement-fournisseur/list-reglement-fournisseur.component';
import { ShowReglementFournisseurComponent } from './show-reglement-fournisseur/show-reglement-fournisseur.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


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
    ReglementFournisseurComponent,
    AddReglementFournisseurComponent,
    DeleteReglementFournisseurComponent,
    ListReglementFournisseurComponent,
    ShowReglementFournisseurComponent
  ],
  imports: [
    CommonModule,
    ReglementFournisseurRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class ReglementFournisseurModule { }
