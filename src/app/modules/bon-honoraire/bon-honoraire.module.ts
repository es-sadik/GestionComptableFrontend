import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonHonoraireRoutingModule } from './bon-honoraire-routing.module';
import { BonHonoraireComponent } from './bon-honoraire.component';
import { AddEditBonHonoraireComponent } from './add-edit-bon-honoraire/add-edit-bon-honoraire.component';
import { DeleteBonHonoraireComponent } from './delete-bon-honoraire/delete-bon-honoraire.component';
import { ListBonHonoraireComponent } from './list-bon-honoraire/list-bon-honoraire.component';
import { ShowBonHonoraireComponent } from './show-bon-honoraire/show-bon-honoraire.component';
import { MaterialModule } from 'src/app/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FacturationComponent } from './facturation/facturation.component';



@NgModule({
  declarations: [
    BonHonoraireComponent,
    AddEditBonHonoraireComponent,
    DeleteBonHonoraireComponent,
    ListBonHonoraireComponent,
    ShowBonHonoraireComponent,
    FacturationComponent
    
  ],
  imports: [
    CommonModule,
    BonHonoraireRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ]
})
export class BonHonoraireModule { }
