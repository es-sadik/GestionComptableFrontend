import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BonHonoraire } from 'src/app/entities/bon-honoraire';
import { ReglementClient } from 'src/app/entities/reglement-client';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { BonHonoraireService } from '../../bon-honoraire/bon-honoraire.service';
import { ReglementClientService } from '../reglement-client.service';

@Component({
  selector: 'app-delete-reglement-client',
  templateUrl: './delete-reglement-client.component.html',
  styleUrls: ['./delete-reglement-client.component.css']
})
export class DeleteReglementClientComponent implements OnInit {

  reglementClient: ReglementClient = new ReglementClient();
  sweetAlert : SweetAlert = new SweetAlert();
  
  constructor(private reglementClientService: ReglementClientService, private bonHonoraireService: BonHonoraireService, @Inject(MAT_DIALOG_DATA) public data :any ,private dialogRef : MatDialogRef<DeleteReglementClientComponent>){}

  ngOnInit(): void {
   if(this.data){
     this.reglementClient = this.data;
   }
  }

  deleteReglementClientById(){
    
    let bonHonoraire: BonHonoraire = this.reglementClient.bonHonoraire;
    bonHonoraire.montantPayer -= this.reglementClient.avance; 
    bonHonoraire.status = false;
    bonHonoraire.valide = true;
    this.bonHonoraireService.updateBonHonoraireFromReglementClient(bonHonoraire.idBh,bonHonoraire).subscribe( data  =>{         
      
    })

    this.reglementClientService.deleteReglementClientById(this.reglementClient.idRegC).subscribe(data => {
      
      this.sweetAlert.alertSuccessTimer("Le reglement " +this.reglementClient.codeRC+" a été supprimé");
      
    },error =>{
      
      this.sweetAlert.alertErrorOk("Le reglement  " +this.reglementClient.codeRC+" n'a pas été supprimé");
    })
    this.dialogRef.close();

  }
}
