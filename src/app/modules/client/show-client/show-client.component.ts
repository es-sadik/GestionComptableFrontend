import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/entities/client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.css']
})
export class ShowClientComponent implements OnInit {

  clientForm :FormGroup ;
  imageUrl: string ="/assets/imgs/avatar.png"
  client :Client = new Client();

  constructor(private _formBuilder: FormBuilder ,@Inject(MAT_DIALOG_DATA) public id :number ,private dialogRef : MatDialogRef<ShowClientComponent>,private clientService :ClientService) { }

  ngOnInit(): void {

    this.declareForm();
    this.getClientById();


  }

  declareForm(){
    this.clientForm = this._formBuilder.group({
      codeC:null,
      nom: null,
      siteWeb: null,
      ifi : null,
      ice: null,
      tp: null,
      cnss: null,
      rc: null,
      ville: null,
      adresse: null,
      codePostale: null,
      email: null,
      telePortable: ' ',
      teleFix: null,
      bilan: null,
      pvBilan: null,
      regime: null,
      rTva: null,
      rCnss: null
    });
  }

  getClientById(){
    this.clientService.getClientById(this.id).subscribe(data => {
      this.client = data;
      this.fillForm();
  
      if(this.client.image != null){
         this.clientService.getImage().subscribe(data => {
           this.imageUrl = data;
         })
      }
    })
  }

  fillForm(){

    this.clientForm.patchValue({
      codeC: this.client.codeC,
      nom: this.client.nom,
      siteWeb: this.client.siteWeb,
      ifi : this.client.ifi,
      ice: this.client.ice,
      tp: this.client.tp,
      cnss: this.client.cnss,
      rc: this.client.rc,
      ville: this.client.ville,
      adresse: this.client.adresse,
      codePostale: this.client.codePostale,
      email: this.client.email,
      telePortable: this.client.telePortable,
      teleFix: this.client.teleFix,
      bilan: this.client.bilan,
      pvBilan: this.client.pvBilan,
      regime: this.client.regime,
      rTva: this.client.rTva,
      rCnss: this.client.rCnss
    });
  }

}
