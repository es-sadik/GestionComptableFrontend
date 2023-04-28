import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BonHonoraire } from 'src/app/entities/bon-honoraire';
import { BonHonoraireService } from '../bon-honoraire.service';
import { DeleteBonHonoraireComponent } from '../delete-bon-honoraire/delete-bon-honoraire.component';
import { ShowBonHonoraireComponent } from '../show-bon-honoraire/show-bon-honoraire.component';

@Component({
  selector: 'app-list-bon-honoraire',
  templateUrl: './list-bon-honoraire.component.html',
  styleUrls: ['./list-bon-honoraire.component.css']
})
export class ListBonHonoraireComponent implements AfterViewInit {

  
  displayedColumns: string[] = ['bonANum', 'nomF', 'dateBa', 'montantTotal', 'montantPayer', 'status', 'valide', 'actions'];
 
  dataSource: MatTableDataSource<BonHonoraire>;
  listBonHonoraire: BonHonoraire[];
  bonHonoraire : BonHonoraire = new BonHonoraire();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private bonHonoraireService:BonHonoraireService , public dialog: MatDialog ) 
  {

  }
  
  

  ngAfterViewInit() {
    this.getAllBonHonoraire();
  }

  getAllBonHonoraire(){
    this.bonHonoraireService.getBonHonoraireList().subscribe(data =>{
      
      this.listBonHonoraire = data;
      this.dataSource = new MatTableDataSource(this.listBonHonoraire);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data)
      console.log(this.listBonHonoraire)
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
    this.dialog.open(ShowBonHonoraireComponent,{
      width:'30%',
      height:'90%',
      data:row
    })
  }



  openDialogDelete(row :any) {
    
    this.dialog.open(DeleteBonHonoraireComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getAllBonHonoraire() ;
    });

  }


}
