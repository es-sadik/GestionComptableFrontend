import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-show-fournisseur',
  templateUrl: './show-fournisseur.component.html',
  styleUrls: ['./show-fournisseur.component.css']
})
export class ShowFournisseurComponent implements OnInit {

  fournisseurForm : FormGroup ;
  imageUrl: string ="/assets/imgs/avatar.png"
  fornisseur : Fournisseur = new Fournisseur() ;
  constructor(private _formBuilder: FormBuilder ,@Inject(MAT_DIALOG_DATA) public id :number ,private dialogRef : MatDialogRef<ShowFournisseurComponent>,private fournisseurService :FournisseurService) { }

  ngOnInit(): void {
    this.declareForm()
    this.getFournisseurById()

  }

  declareForm(){
    this.fournisseurForm = this._formBuilder.group({
      codeF: null,
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
      telePortable: null,
      teleFix: null
    });
  }

  getFournisseurById(){
    this.fournisseurService.getFournisseurById(this.id).subscribe(data =>{
      this.fornisseur = data 
      this.fillForm()

    if(this.fornisseur.image != null){
      this.fournisseurService.getImage().subscribe(data =>{
        this.imageUrl =data 
      })
    }

    })
  }

  fillForm(){

    this.fournisseurForm.patchValue({
      codeF: this.fornisseur.codeF,
      nom: this.fornisseur.nom,
      siteWeb: this.fornisseur.siteWeb,
      ifi : this.fornisseur.ifi,
      ice: this.fornisseur.ice,
      tp: this.fornisseur.tp,
      cnss: this.fornisseur.cnss,
      rc: this.fornisseur.rc,
      ville: this.fornisseur.ville,
      adresse: this.fornisseur.adresse,
      codePostale: this.fornisseur.codePostale,
      email: this.fornisseur.email,
      telePortable: this.fornisseur.telePortable,
      teleFix: this.fornisseur.teleFix
    });
  }

}
