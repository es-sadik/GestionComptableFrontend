import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Produit } from 'src/app/entities/produit';
import { DeleteProduitComponent } from '../delete-produit/delete-produit.component';

import { ProduitService } from '../produit.service';
import { ShowProduitComponent } from '../show-produit/show-produit.component';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css']
})
export class ListProduitComponent implements AfterViewInit {

  displayedColumns: string[] =['reference','nom','prixVente','quantitieDisponible','actions']
  produits : Produit[];
  produitsOrderBy : Produit[];

  produit : Produit = new Produit();

  dataSource: MatTableDataSource<Produit>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private produitService: ProduitService ,  public dialog: MatDialog ) { }

  ngAfterViewInit(): void {
    this.getAllProduits();
    this.selectProduitsOrderByCategorie()
  }

  getAllProduits(){
    this.produitService.getAllProduits().subscribe(data => {
      this.produits = data;
      this.dataSource = new MatTableDataSource(this.produits);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


  }

  selectProduitsOrderByCategorie(){
    this.produitService.selectProduitsOrderByCategorie().subscribe(data => {
      this.produitsOrderBy = data;
    })
  }
  
  getProduitByRef(reference : string){
    this.produitService.getProduitByRef(reference).subscribe(data=>{

    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogShow(row :any){
    this.dialog.open(ShowProduitComponent,{
      width:'95%',
      height:'90%',
      data:row
    })
  }
  
  openDialogDelete(row :any){
    this.dialog.open(DeleteProduitComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      this.getAllProduits()
    })
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
    
     
     const head = [['Réf', 'Designation','TVA (%)', 'Categorie', 'Qté']]
     let data = []
     for(let i=0 ;i<this.produitsOrderBy.length ;i++){
       data.push([this.produitsOrderBy[i].reference, this.produitsOrderBy[i].designation,this.produitsOrderBy[i].tva, this.produitsOrderBy[i].categorie.nomCat , this.produitsOrderBy[i].quantitieDisponible])
     }
     
     const doc = new jsPDF()
     doc.setProperties({
       title: "LISTE PRODUITS",
       
     });
     doc.setTextColor('#0A043C')
     let date = new Date();
     doc.text(date.toLocaleDateString(),175,10)
     doc.setFontSize(30);
     doc.text('LISTE PRODUITS',110,30,{align:'center'})
     
      autoTable(doc, {
       theme :'grid',
       head: head,
       body: data,
       tableWidth: 'auto',
       margin: { top: 40 }   
     })
     
     //doc.save('produits.pdf')
     window.open(URL.createObjectURL(doc.output("blob")))
   }

}

