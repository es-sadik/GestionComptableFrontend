import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReglementClient } from 'src/app/entities/reglement-client';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { DeleteReglementClientComponent } from '../delete-reglement-client/delete-reglement-client.component';
import { ReglementClientService } from '../reglement-client.service';

@Component({
  selector: 'app-list-reglement-client',
  templateUrl: './list-reglement-client.component.html',
  styleUrls: ['./list-reglement-client.component.css']
})
export class ListReglementClientComponent implements OnInit {


  displayedColumns: string[] = ['bonHNum','nomC' , 'codeRC', 'datePayment', 'modePayment', 'avance', 'reste', 'status','actions'];
  listReglementClient: ReglementClient[];
  reglementClient : ReglementClient = new ReglementClient();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ReglementClient>;
  sweetAlert : SweetAlert = new SweetAlert();

  constructor(private reglementClientService : ReglementClientService , public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getAllReglementClient()
  }
  getAllReglementClient(){
    this.reglementClientService.getAllReglementClient().subscribe(data =>{
      this.listReglementClient= data;
      this.dataSource = new MatTableDataSource(this.listReglementClient);
     
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    
    });
    
  }

  // serch 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // dialog delete :
  openDialog(row :any) {
    this.dialog.open(DeleteReglementClientComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getAllReglementClient() ;
    });
  }


}
