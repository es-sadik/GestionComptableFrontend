import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BonAchat } from 'src/app/entities/bon-achat';
import { ReglementFournisseur } from 'src/app/entities/reglement-fournisseur';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { BonAchatService } from '../../bon-achat/bon-achat.service';
import { ReglementFournisseurService } from '../reglement-fournisseur.service';

@Component({
  selector: 'app-delete-reglement-fournisseur',
  templateUrl: './delete-reglement-fournisseur.component.html',
  styleUrls: ['./delete-reglement-fournisseur.component.css']
})
export class DeleteReglementFournisseurComponent implements OnInit {
  reglementFournisseur: ReglementFournisseur = new ReglementFournisseur();
  sweetAlert : SweetAlert = new SweetAlert();
  
  constructor(private reglementFournisseurService: ReglementFournisseurService, private bonAchatService: BonAchatService, @Inject(MAT_DIALOG_DATA) public data :any ,private dialogRef : MatDialogRef<DeleteReglementFournisseurComponent>){}

  ngOnInit(): void {
   if(this.data){
     this.reglementFournisseur = this.data;
   }
  }

  deleteReglementFournisseurById(){
    let bonAchat: BonAchat = this.reglementFournisseur.bonAchat;
    bonAchat.montantPayer -= this.reglementFournisseur.avance; 
    bonAchat.status = false;
    bonAchat.valide = true
    this.bonAchatService.updateBonAchatFromReglementFournisseur(bonAchat.idBa,bonAchat).subscribe( data  =>{         

    })

    this.reglementFournisseurService.deleteReglementFournisseurById(this.reglementFournisseur.idRegF).subscribe(data => {
      this.dialogRef.close()
      this.sweetAlert.alertSuccessTimer("Le reglement " +this.reglementFournisseur.codeRF+" a été supprimé");
      
    },error =>{
      this.dialogRef.close()
      this.sweetAlert.alertErrorOk("Le reglement  " +this.reglementFournisseur.codeRF+" n'a pas été supprimé");
    })

  }


}
