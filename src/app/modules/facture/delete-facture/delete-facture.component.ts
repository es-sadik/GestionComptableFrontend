import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Facture } from 'src/app/entities/facture';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-delete-facture',
  templateUrl: './delete-facture.component.html',
  styleUrls: ['./delete-facture.component.css']
})
export class DeleteFactureComponent implements OnInit {

  facture: Facture = new Facture();
  sweetAlert : SweetAlert = new SweetAlert();
  
  constructor(private factureService: FactureService, @Inject(MAT_DIALOG_DATA) public data :any ,private dialogRef : MatDialogRef<DeleteFactureComponent>){}

  ngOnInit(): void {
   if(this.data){
     this.facture = this.data;
   }
  }

  deleteFactureById(){

    this.factureService.deleteFactureById(this.facture.idFac).subscribe(data => {
      this.dialogRef.close()
      this.sweetAlert.alertSuccessTimer("La facture " +this.facture.facNum+" a été supprimé");
      
      
    },error =>{
      this.dialogRef.close()
      this.sweetAlert.alertErrorOk("La facture  " +this.facture.facNum+" n'a pas été supprimé");
    })

  }

}
