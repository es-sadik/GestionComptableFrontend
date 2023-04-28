import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { BonAchat } from 'src/app/entities/bon-achat';
import { BonAchatService } from '../bon-achat.service';
import { DeleteBonAchatComponent } from '../delete-bon-achat/delete-bon-achat.component';
import { ShowBonAchatComponent } from '../show-bon-achat/show-bon-achat.component';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success ',
    cancelButton: 'btn btn-danger me-2'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-list-bon-achat',
  templateUrl: './list-bon-achat.component.html',
  styleUrls: ['./list-bon-achat.component.css']
})
export class ListBonAchatComponent  implements AfterViewInit {

  displayedColumns: string[] = ['bonANum', 'nomF', 'dateBa', 'montantTotal', 'montantPayer', 'status', 'valide', 'actions'];
  dataSource: MatTableDataSource<BonAchat>;
  listBonAchat: BonAchat[];
  bonAchat : BonAchat = new BonAchat();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private bonAchatService:BonAchatService , public dialog: MatDialog ) {}
  
  

  ngAfterViewInit() {
    this.getAllBonAchat();
    
  }

  getAllBonAchat(){
    this.bonAchatService.getBonAchatList().subscribe(data =>{
      this.listBonAchat = data;
      this.dataSource = new MatTableDataSource(this.listBonAchat);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  openDialogShow(row :any){
    this.dialog.open(ShowBonAchatComponent,{
      width:'95%',
      height:'90%',
      data:row
    })
  }



  openDialogDelete(row :any) {
    
    this.dialog.open(DeleteBonAchatComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getAllBonAchat();
    });
    
  }

  swal(){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
      scrollbarPadding: false,
      heightAuto: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "vous ne pouvez pas modifier ce bon d'achat tant que vous n'avez pas supprimé tous les reglements qui le concernent",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      scrollbarPadding: false,
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({

          title:'Deleted!',
          text:'Your file has been deleted.',
          icon:'success',
          showConfirmButton:false,
          timer:1500,
          scrollbarPadding: false,
          heightAuto: false
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error',
        )
      }
    })
  }

}



