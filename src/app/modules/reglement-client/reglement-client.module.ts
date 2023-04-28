import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglementClientRoutingModule } from './reglement-client-routing.module';
import { ReglementClientComponent } from './reglement-client.component';
import { AddReglementClientComponent } from './add-reglement-client/add-reglement-client.component';
import { DeleteReglementClientComponent } from './delete-reglement-client/delete-reglement-client.component';
import { ListReglementClientComponent } from './list-reglement-client/list-reglement-client.component';
import { ShowReglementClientComponent } from './show-reglement-client/show-reglement-client.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ReglementClientComponent,
    AddReglementClientComponent,
    DeleteReglementClientComponent,
    ListReglementClientComponent,
    ShowReglementClientComponent
  ],
  imports: [
    CommonModule,
    ReglementClientRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class ReglementClientModule { }
