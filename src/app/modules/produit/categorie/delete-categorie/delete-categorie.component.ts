import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie } from 'src/app/entities/categorie';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.css']
})
export class DeleteCategorieComponent implements OnInit {

  categorie: Categorie = new Categorie();
  sweetAlert : SweetAlert = new SweetAlert();

  
  constructor(private categorieService: CategorieService,
    @Inject(MAT_DIALOG_DATA) public data :any ,
   private dialogRef : MatDialogRef<DeleteCategorieComponent>
  ){}

  ngOnInit(): void {
   if(this.data){
     this.categorie.idCat = this.data.idCat ;
     this.categorie.nomCat = this.data.nomCat ;
   }
  }

  deleteCategorieById(){
    this.categorieService.deleteCategorieById(this.categorie.idCat).subscribe(data => {
      this.dialogRef.close();
      if(data){
        this.sweetAlert.alertSuccessTimer("La categorie  " +this.categorie.nomCat+" a été supprimé");
      }
      else{
        this.sweetAlert.alertErrorOkTwo("Imposible Supprimer cette categorie !!"," Car déja contient des produits  !")
      }
      
    },error =>{
      this.sweetAlert.alertErrorOk("La categorie  " +this.categorie.nomCat+" n'a pas été supprimé");
    })
  }
}
