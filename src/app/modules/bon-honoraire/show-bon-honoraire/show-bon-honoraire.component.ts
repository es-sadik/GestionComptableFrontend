import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BonHonoraire } from 'src/app/entities/bon-honoraire';
import { BonHonoraireService } from '../bon-honoraire.service';

@Component({
  selector: 'app-show-bon-honoraire',
  templateUrl: './show-bon-honoraire.component.html',
  styleUrls: ['./show-bon-honoraire.component.css']
})
export class ShowBonHonoraireComponent implements OnInit {

  netPayer : number = 0
  bonHonoraire : BonHonoraire = new BonHonoraire()
  constructor(private _formBuilder: FormBuilder ,@Inject(MAT_DIALOG_DATA) public id :number ,private dialogRef : MatDialogRef<ShowBonHonoraireComponent>,private  bonHonoraireService : BonHonoraireService) { }


  ngOnInit(): void {
    this.getBonHonraireById(this.id)
  }

  getBonHonraireById(idBh : number){
    this.bonHonoraireService.getBonHonoraireById(idBh).subscribe ((data) =>{
      this.bonHonoraire = data
      this.bonHonoraire.listLignBH.forEach((lign)=>{
        this.netPayer += (lign.quantite)*(lign.prixUnitaire + lign.produit.tva*lign.prixUnitaire)
  
       })
    })
  }

  openPDF(){
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setProperties({
      title: `${this.bonHonoraire.bonHNum}`,
      
    });
    let DATA: any = document.getElementById('contenu');
   
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var widthcontenu : any  = document.getElementById('contenu')?.offsetWidth;
  
    console.log("width contenu"+widthcontenu)
    console.log(pageHeight)
    console.log("pageWidth "+pageWidth)

    doc.html(DATA, {
      
      callback: (pdf) => {
      window.open(URL.createObjectURL(pdf.output("blob")))
      },
      x:(pageWidth - widthcontenu)/2,
      y: 20
    })

    //window.open(URL.createObjectURL(pdf.output("blob")),"_blank","top=100,left=200,width=1000,height=500")
    
    
    //doc.save('clients.pdf')
    //window.open(URL.createObjectURL(doc.output("blob")))
  }

}
