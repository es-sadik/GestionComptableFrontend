import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from 'src/app/entities/categorie';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-add-edit-categorie',
  templateUrl: './add-edit-categorie.component.html',
  styleUrls: ['./add-edit-categorie.component.css']
})
export class AddEditCategorieComponent implements OnInit {

  categorieForm: FormGroup;
  categorie: Categorie = new Categorie();
  isAddMode: boolean;
  content: string;
  sweetAlert : SweetAlert = new SweetAlert();
  
  constructor(private categorieService: CategorieService ,private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data :any ,private dialogRef : MatDialogRef<AddEditCategorieComponent>){}

  ngOnInit(): void {

    this.declareForm();

    this.isAddMode =!this.data;

    if(this.isAddMode){
      this.content = "Ajoute";
    }
    else{
      this.content = "Edite";
      this.categorie.idCat = this.data.idCat ;
      this.categorie.nomCat = this.data.nomCat ;
      this.setFormValues();
    }

    
  }

  declareForm(){
    this.categorieForm = this._formBuilder.group({
      nomCat: ['',Validators.required]
    });
  }

  setFormValues(){
    this.categorieForm.controls['nomCat'].setValue(this.categorie.nomCat);
  }

  onSubmit(){
    if(this.isAddMode){
      this.AddCategorie();
    }
    else{
      this.editCategorie();
    }
  }

  AddCategorie(){

    this.categorie.nomCat = this.categorieForm.controls['nomCat'].value;
 
    this.categorieService.addCategorie(this.categorie).subscribe(data =>{
     this.dialogRef.close();

     this.sweetAlert.alertSuccessTimer("La catégorie : " +this.categorie.nomCat+" a été ajouté")
     
   },erro =>{
     this.sweetAlert.alertErrorOk("La catégorie : " +this.categorie.nomCat+" n'a pas été ajouté")
   });

    
  }

  editCategorie(){

   this.categorie.nomCat = this.categorieForm.controls['nomCat'].value;
   this.categorieService.updateCategorie(this.categorie.idCat, this.categorie).subscribe(data =>{
    this.dialogRef.close();
    this.sweetAlert.alertSuccessTimer("La catégorie : " +this.categorie.nomCat+" a été modifié ")
    
  },erro =>{
    this.sweetAlert.alertErrorOk("La catégorie : " +this.categorie.nomCat+" n'a pas été modifié ")
  });
   
  }



}
