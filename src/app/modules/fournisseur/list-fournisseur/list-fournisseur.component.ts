import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { DeleteFournisseurComponent } from '../delete-fournisseur/delete-fournisseur.component';
import { FournisseurService } from '../fournisseur.service';
import { ShowFournisseurComponent } from '../show-fournisseur/show-fournisseur.component';


import jsPDF from 'jspdf'
//import * as autoTable from 'jspdf-autotable';
import autoTable from 'jspdf-autotable'; 
import 'jspdf-autotable';
@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nom', 'email', 'telePortable', 'actions'];
  fournisseurs : Fournisseur[] ;
  fournisseur : Fournisseur = new Fournisseur();
  dataSource: MatTableDataSource<Fournisseur>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private fournisseurService :FournisseurService , public dialog: MatDialog ) 
  {
   }
  
  ngAfterViewInit(){
    this.getFournisseurs()
  }

  getFournisseurs(){
    this.fournisseurService.getAllFournisseurs().subscribe(data =>{
      this.fournisseurs = data;
      this.dataSource = new MatTableDataSource(this.fournisseurs);
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
    this.dialog.open(ShowFournisseurComponent,{
      width:'95%',
      height:'90%',
      data:row
    })
  }

  openDialogDelete(row :any) {
    this.dialog.open(DeleteFournisseurComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getFournisseurs() ;
    });
  }

  public openPDF(): void {
    /*
       let DATA: any = document.getElementById('htmlData');
     html2canvas(DATA).then((canvas) => {
       let fileWidth = 208;
       let fileHeight = (canvas.height * fileWidth) / canvas.width;
       const FILEURI = canvas.toDataURL('image/png');
       let PDF = new jsPDF('p', 'mm', 'A4');
       let position = 0;
       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
       PDF.save('angular-demo.pdf');
     });
      ///
      let DATA: any = document.getElementById('htmlData');
 
     let pdf = new jsPDF()
     pdf.html(DATA, {
       callback: (pdf) => {
         pdf.save("sample.pdf")
       },
     
     })*/
    
     
     const head = [['Code Fournisseur', 'Nom', 'Email', 'Numéro De Téléphone']]
     let data = []
     for(let i=0 ;i<this.fournisseurs.length ;i++){
       data.push([this.fournisseurs[i].codeF, this.fournisseurs[i].nom, this.fournisseurs[i].email , this.fournisseurs[i].telePortable])
     }
     
     const doc = new jsPDF()
     doc.setProperties({
       title: "LIST FOURNISSEURS",
       
     });
     doc.setTextColor('#0A043C')
     doc.setFontSize(30);
     doc.text('LIST FOURNISSEURS',110,20,{align:'center'})
     
      autoTable(doc, {
       theme :'grid',
       head: head,
       body: data,
       tableWidth: 'auto',
       margin: { top: 30 }   
     })
 
 
     
     
     //doc.save('clients.pdf')
     window.open(URL.createObjectURL(doc.output("blob")))
   }
}

