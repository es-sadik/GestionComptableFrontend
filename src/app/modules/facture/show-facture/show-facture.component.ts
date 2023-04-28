import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { Facture } from 'src/app/entities/facture';
import { LignBH } from 'src/app/entities/lign-bh';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-show-facture',
  templateUrl: './show-facture.component.html',
  styleUrls: ['./show-facture.component.css']
})
export class ShowFactureComponent implements OnInit {
 
  totaleMontantHt  : number
  totaleTauxTva : number
  totaleMontantTtc : number

  facture : Facture = new Facture();
  listLignBH : LignBH[];
  id : number
  constructor(private factureService : FactureService , private router: Router,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getFactureByIdFac()

  }

  /** imprimer facture : **/
  openPDF(){
    const doc = new jsPDF('p', 'pt', 'a4');
    const pages = doc.internal.pageSize;
    doc.setProperties({
      title: `Facture N° : ${this.facture.facNum}`,
      
    });
    let shand = document.getElementsByClassName('tablewidth') as HTMLCollectionOf<HTMLElement>;


        if (shand.length != 0) {
          shand[0].style.width = "600px";
        }
        
    let DATA: any = document.getElementById('content1')
    let Class_tbody_ligne1 = document.getElementsByClassName('tbody_ligne1') as HTMLCollectionOf<HTMLElement>;
   
    
    let tbody_ligne1 : any = document.getElementById('tbody_ligne1')
    /*var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var widthcontenu : any  = document.getElementById('contenu')?.offsetWidth;
  
    console.log("width contenu"+widthcontenu)
    console.log(pageHeight)
    console.log("pageWidth "+pageWidth)*/

    var Height_tbody_ligne1 : any  = document.getElementById('tbody_ligne1')?.offsetHeight;
    var newHeight_tbody_ligne1 = Height_tbody_ligne1 - (this.listLignBH.length * 22)

    console.log("new  =  "+newHeight_tbody_ligne1)
    console.log("Height_tbody_ligne1  =  "+Height_tbody_ligne1)

      Class_tbody_ligne1[0].style.height = `${newHeight_tbody_ligne1}px`;

  
    doc.html(DATA, {
      
       callback: (pdf) => {
      //  doc.save('test.pdf'); // save / download
      //  doc.output('dataurlnewwindow'); // just open it

      window.open(URL.createObjectURL(pdf.output("blob")))
     
      },
   /*  callback:()=>{
      doc.save('test.pdf'); // save / download
      doc.output('dataurlnewwindow'); // just open it
     }, */
      x:1,
      y: 10
    })
    setTimeout(() => {
      shand[0].style.width = "100%";
    }, 1);

  }

  /** get facture By idFac : */
  getFactureByIdFac(){
    this.factureService.getFactureById(this.id).subscribe( data =>{
      this.facture = data
      this.listLignBH = this.facture.bonHonoraire.listLignBH
      this.totale()
    })

  }

  // totale : 
  totale(){
    this.totaleMontantHt = 0;
    this.totaleTauxTva = 0;
    this.totaleMontantTtc = 0;
    this.listLignBH.forEach((currentValue, index) => {
      this.totaleMontantHt += (currentValue.prixUnitaire * currentValue.quantite);
      this.totaleTauxTva += (currentValue.prixUnitaire * currentValue.quantite) * (currentValue.produit.tva/100);
      this.totaleMontantTtc += currentValue.montantTtc;
    });
  }
}
