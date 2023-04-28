import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Client } from 'src/app/entities/client';
import { ClientService } from '../client.service';
import { ShowClientComponent } from '../show-client/show-client.component';
import jsPDF from 'jspdf'
//import * as autoTable from 'jspdf-autotable';
import autoTable from 'jspdf-autotable'; 
import 'jspdf-autotable';
import { DeleteClientComponent } from '../delete-client/delete-client.component';


@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})



export class ListClientComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'nom', 'email', 'telePortable', 'actions'];
  clients: Client[] ;
  client : Client = new Client();  
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  @ViewChild('content', { static: false }) el!: ElementRef;
 

  constructor(private clientService:ClientService , public dialog: MatDialog )
   {
   }
  
  

  ngAfterViewInit() {
    
    this.getClients();
  }

  getClients(){
    this.clientService.getClientList().subscribe(data =>{
      this.clients = data;

      this.dataSource = new MatTableDataSource(this.clients);
      
      console.log(this.dataSource)
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
    this.dialog.open(ShowClientComponent,{
      width:'95%',
      height:'90%',
      data:row
    })
  }

  openDialog(row :any) {
    this.dialog.open(DeleteClientComponent,{
      width:'30%',
      data:row,
    }).afterClosed().subscribe(val =>{
      this.getClients() ;

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
   
    
    const head = [['Code Client', 'Nom', 'Email', 'Numéro De Téléphone']]
    let data = []
    for(let i=0 ;i<this.clients.length ;i++){
      data.push([this.clients[i].codeC, this.clients[i].nom, this.clients[i].email , this.clients[i].telePortable])
    }
    
    const doc = new jsPDF()
    doc.setProperties({
      title: "LIST CLIENTS",
      
    });
    doc.setTextColor('#0A043C')
    doc.setFontSize(30);
    doc.text('LIST CLIENTS',110,20,{align:'center'})
    
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


