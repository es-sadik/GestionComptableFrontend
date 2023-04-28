import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/entities/user';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { AdminService } from '../admin.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['userName','etat', 'actions'];
  dataSource: MatTableDataSource<User>;
  user: User = new User();
  users : User[];
  sweetAlert: SweetAlert = new SweetAlert();
  constructor(private adminService: AdminService, public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    this.setUserList();

  }

  setUserList(){

    this.adminService.getUserListWithoutAdmin().subscribe(data =>{
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
    });

  }

  openDialogDelete(row :any) {
    
    this.dialog.open(DeleteUserComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.setUserList();

    });
  }

  

}
