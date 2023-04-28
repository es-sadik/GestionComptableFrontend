import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Facture } from 'src/app/entities/facture';
import { DeleteFactureComponent } from '../delete-facture/delete-facture.component';
import { FactureService } from '../facture.service';
import { ShowFactureComponent } from '../show-facture/show-facture.component';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements AfterViewInit{


  displayedColumns: string[] = ['Ref', 'Commande', 'Date', 'Client', 'TotalHt', 'TotalTva', 'TotalTtc', 'actions'];
 
  dataSource: MatTableDataSource<Facture>;
  
  listFacture: Facture[];
  facture : Facture = new Facture();

  heightFoterAutotable : number
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private factureService:FactureService , public dialog: MatDialog ) 
  {

  }
  
  

  ngAfterViewInit() {
    this.getAllFacture();
  }

  getAllFacture(){
    this.factureService.getFactureList().subscribe(data =>{
      this.listFacture = data;
      this.dataSource = new MatTableDataSource(this.listFacture);
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
    this.dialog.open(ShowFactureComponent,{
      width:'30%',
      height:'90%',
      data:row
    })
  }



  openDialogDelete(row :any) {
    
    this.dialog.open(DeleteFactureComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getAllFacture();
    });

  }

  public openPDF(): void {
     
     const head = [['N° FA', 'Commande', 'Date', 'Client','Total HT','Total TVA','Total TTC']]
     let data = []
     for(let i=0 ;i<this.listFacture.length ;i++){
       data.push([this.listFacture[i].facNum, this.listFacture[i].bonHonoraire.bonHNum, this.listFacture[i].dateFac.toLocaleString(), this.listFacture[i].bonHonoraire.client.nom,this.listFacture[i].totalHt,this.listFacture[i].totalTva,this.listFacture[i].totalTtc])
     }
     
     const doc = new jsPDF()
     doc.setProperties({
       title: "LISTE FACTURES",
       
     });
     doc.setTextColor('#0A043C')
     doc.setFontSize(15);

     let date = new Date();
     let firstday = new Date(date.getFullYear(),0,1)

     doc.text(`Les factures : de ${firstday.toLocaleDateString()} à ${date.toLocaleDateString()}`,110,20,{align:'center'})
     
      autoTable(doc, {
       theme :'grid',
       head: head,
       body: data,
       tableWidth: 'auto',
       margin: { top: 30 },
       didDrawPage: (d) => console.log(d.cursor?.y),
     })
     
     console.log()
     window.open(URL.createObjectURL(doc.output("blob")))
   }



}
