import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BonAchat } from 'src/app/entities/bon-achat';
import { Stock } from 'src/app/Utils/stock';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { ProduitService } from '../../produit/produit.service';
import { BonAchatService } from '../bon-achat.service';

@Component({
  selector: 'app-delete-bon-achat',
  templateUrl: './delete-bon-achat.component.html',
  styleUrls: ['./delete-bon-achat.component.css']
})
export class DeleteBonAchatComponent implements OnInit {

  bonAchat: BonAchat = new BonAchat();
  stoke: Stock = new Stock(this.produitService);
  sweetAlert : SweetAlert = new SweetAlert();

  
  constructor(private bonAchatService: BonAchatService, private produitService: ProduitService,
    @Inject(MAT_DIALOG_DATA) public data :any ,
   private dialogRef : MatDialogRef<DeleteBonAchatComponent>
  ){}

  ngOnInit(): void {
   if(this.data){
     this.bonAchat = this.data;
   }
  }

  deleteBonAchatById(){
    if(this.bonAchat.valide){
      this.stoke.removeFromStockByBonAchat(this.bonAchat.listLignBA);
    }
    this.bonAchatService.deleteBonAchatById(this.bonAchat.idBa).subscribe(data => {
      this.dialogRef.close();

      if(data){
        this.sweetAlert.alertSuccessTimer("Le bon d'achat " +this.bonAchat.bonANum+" a été supprimé");
      }
      else{
        this.sweetAlert.alertErrorOkTwo("Imposible Supprimer ce bon d'achat !!"," Car le bon d'achat a un reglement  !")
      }
      
    },error =>{
      this.sweetAlert.alertErrorOk("Le bon d'achat  " +this.bonAchat.bonANum+" n'a pas été supprimé");
    })
  }
  
  

}
