import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture.component';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { ListFactureComponent } from './list-facture/list-facture.component';
import { ShowFactureComponent } from './show-facture/show-facture.component';
import { DeleteFactureComponent } from './delete-facture/delete-facture.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  declarations: [
    FactureComponent,
    AddFactureComponent,
    ListFactureComponent,
    ShowFactureComponent,
    DeleteFactureComponent
  ],
  imports: [
    CommonModule,
    FactureRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ]
})
export class FactureModule { }
