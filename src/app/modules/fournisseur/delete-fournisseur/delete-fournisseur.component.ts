import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-delete-fournisseur',
  templateUrl: './delete-fournisseur.component.html',
  styleUrls: ['./delete-fournisseur.component.css']
})
export class DeleteFournisseurComponent implements OnInit {

  namFournisseur : string;
  ID : number;
  sweetAlert: SweetAlert = new SweetAlert();


  constructor(private fournisseurService:FournisseurService, @Inject(MAT_DIALOG_DATA) public editdata :any, private dialogRef : MatDialogRef<DeleteFournisseurComponent>,){
    
  }

  ngOnInit(): void {
   if(this.editdata){
     this.namFournisseur = this.editdata.nom ;
     this.ID= this.editdata.id ;
   }
  }

  deleteFournisseurById(){
    this.fournisseurService.deleteFournisseurById(this.ID).subscribe(data => {
      this.dialogRef.close();
      if(data){
        this.sweetAlert.alertSuccessTimer("Le fournisseur  " +this.namFournisseur+" a été supprimé");
      }
      else{
        this.sweetAlert.alertErrorOkTwo("Imposible Supprimer ce fournisseur !!"," Le fournisseur déja passer un bon d'achat !")
      }
      
    },error =>{
      this.sweetAlert.alertErrorOk("Le fournisseur  " +this.namFournisseur+" n'a pas été supprimé");
    })
  }

}
