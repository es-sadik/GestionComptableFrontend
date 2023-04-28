import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { BonAchatRoutingModule } from './bon-achat-routing.module';
import { BonAchatComponent } from './bon-achat.component';
import { ListBonAchatComponent } from './list-bon-achat/list-bon-achat.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { DeleteBonAchatComponent } from './delete-bon-achat/delete-bon-achat.component';
import { AddEditBonAchatComponent } from './add-edit-bon-achat/add-edit-bon-achat.component';
import { ShowBonAchatComponent } from './show-bon-achat/show-bon-achat.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  declarations: [
    BonAchatComponent,
    ListBonAchatComponent,
    DeleteBonAchatComponent,
    AddEditBonAchatComponent,
    ShowBonAchatComponent
  ],
  imports: [
    CommonModule,
    BonAchatRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ],
  providers : [DecimalPipe]
})
export class BonAchatModule { }
