import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';

import { NotifierService } from 'angular-notifier';
import { SweetAlert } from 'src/app/Utils/sweet-alert';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent implements OnInit {

  namClient : string;
  ID : number;
  sweetAlert: SweetAlert = new SweetAlert();


  constructor(private clientService:ClientService, @Inject(MAT_DIALOG_DATA) public editdata :any, private dialogRef : MatDialogRef<DeleteClientComponent>,){
    
  }

  ngOnInit(): void {
   if(this.editdata){
     this.namClient = this.editdata.nom ;
     this.ID= this.editdata.id ;
   }
  }

  deleteClientById(){
    this.clientService.deleteClientById(this.ID).subscribe(data => {
      this.dialogRef.close();
      if(data){
        this.sweetAlert.alertSuccessTimer("Le client  " +this.namClient+" a été supprimé");
      }
      else{
        this.sweetAlert.alertErrorOkTwo("Imposible Supprimer ce client !!"," Le client déja passer un bon d'honoraire !")
      }
      
    },error =>{
      this.sweetAlert.alertErrorOk("Le client  " +this.namClient+" n'a pas été supprimé");
    })
  }

}
