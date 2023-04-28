import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entities/user';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  user: User = new User();
  sweetAlert : SweetAlert = new SweetAlert();

  
  constructor(private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data :any ,
   private dialogRef : MatDialogRef<DeleteUserComponent>
  ){}

  ngOnInit(): void {
   if(this.data){
     this.user = this.data;
   }
  }

  deleteUserById(){

    this.adminService.deleteUserById(this.user.id).subscribe(data => {
      this.dialogRef.close();
      this.sweetAlert.alertSuccessTimer("L'utilisateur " +this.user.userName+" a été supprimé")
    },
    error =>{
      this.sweetAlert.alertErrorOk("");
    });

  }

}
