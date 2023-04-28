import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-delete-produit',
  templateUrl: './delete-produit.component.html',
  styleUrls: ['./delete-produit.component.css']
})
export class DeleteProduitComponent implements OnInit {

  sweetAlert : SweetAlert = new SweetAlert();
  reference : string
  constructor(private produitService:ProduitService, @Inject(MAT_DIALOG_DATA) public editdata :any ,private dialogRef : MatDialogRef<DeleteProduitComponent>){
    
  }

  ngOnInit(): void {
   if(this.editdata){
     this.reference= this.editdata.reference ;
   }
  }

  deleteProduitByRef(){
    this.produitService.deleteProduitByRef(this.reference).subscribe(data => {
      this.dialogRef.close();
      if(data){
        this.sweetAlert.alertSuccessTimer("Le produit  " +this.reference+" a été supprimé");
      }
      else{
        this.sweetAlert.alertErrorOkTwo("Imposible Supprimer ce produit !!","Car déja appartient à un bon d'achat ou un bon d'honoraire  !")
      }
      
    },error =>{
      this.sweetAlert.alertErrorOk("Le produit  " +this.reference+" n'a pas été supprimé");
    })
  }


}
