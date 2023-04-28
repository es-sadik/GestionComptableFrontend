import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BonHonoraire } from 'src/app/entities/bon-honoraire';
import { Facture } from 'src/app/entities/facture';
import { LignBH } from 'src/app/entities/lign-bh';
import { Produit } from 'src/app/entities/produit';
import { Calculate } from 'src/app/Utils/calculate';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { FactureService } from '../../facture/facture.service';
import { BonHonoraireService } from '../bon-honoraire.service';

export interface DataList {
  produit: Produit;
  prixUnitaire: number;
  quantite: number;
  montantHt : number;
  montantTva:number;
  montantTtc:number;
}

@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.css']
})
export class FacturationComponent implements OnInit {
  
  id : number;
  formInfosBon: FormGroup;
  bonHonoraire : BonHonoraire = new  BonHonoraire()
  facture : Facture = new Facture()

  displayedColumns: string[] = ['reference','designation','quantite' ,'prixUnitaire', 'montantHt', 'montantTva','montantTtc'];
 

  calculate : Calculate = new Calculate() ;

  dataList: Array<DataList> = [] ;

  dataSource : MatTableDataSource<DataList>;
  lignBH : LignBH [];

  totaleMontantHt  : number
  totaleTauxTva    : number
  totaleMontantTtc : number
  sweetAlert : SweetAlert = new SweetAlert();

  constructor(private _formBuilder: FormBuilder ,private bonHonoraireService : BonHonoraireService ,private factureService : FactureService ,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.declareFormInfosBon()
    this.id = this.route.snapshot.params['id'];
    this.getBonHonoraoreById()
    this.setNextFactureNum()

  }

  declareFormInfosBon() {
    this.formInfosBon = this._formBuilder.group({
      client:['', Validators.required],
      FacNum:['', Validators.required],
      dateFac: [new Date(), Validators.required]
      });

  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }
    return '';
  };

  setNextFactureNum(){
    this.factureService.getNextFactureNum(this.formInfosBon.controls['dateFac'].value).subscribe(data =>{
      this.formInfosBon.controls['FacNum'].setValue(data);
   });
  }

  getBonHonoraoreById(){
    this.bonHonoraireService.getBonHonoraireById(this.id).subscribe( data =>{
       this.bonHonoraire = data
      this.formInfosBon.controls['client'].setValue(this.bonHonoraire.client.nom);
      this.dataList = (this.bonHonoraire.listLignBH as any) ;
      this.dataList.forEach(element => {
        this.calculate.calculateMontants(element.prixUnitaire,element.quantite,element.produit.tva);
        element.montantHt = this.calculate.montantHt;
        element.montantTva = this.calculate.montantTva;
        element.montantTtc  = this.calculate.montantTtc
      });
      this.totale()
      this.dataSource = new MatTableDataSource(this.dataList);


    })
  }

  // totale : 
  totale(){
    this.totaleMontantHt = 0;
    this.totaleTauxTva = 0;
    this.totaleMontantTtc = 0;
    this.dataList.forEach((currentValue, index) => {
      this.totaleMontantHt += currentValue.montantHt;
      this.totaleTauxTva += currentValue.montantTva;
      this.totaleMontantTtc += currentValue.montantTtc;
    });
  }


  addFacture(){

    this.facture.totalHt = this.totaleMontantHt
    this.facture.totalTva = this.totaleTauxTva
    this.facture.totalTtc  = this.totaleMontantTtc
    this.facture.facNum =this.formInfosBon.controls['FacNum'].value
    this.facture.dateFac = this.formInfosBon.controls['dateFac'].value
    
    this.facture.bonHonoraire=this.bonHonoraire

    this.factureService.addFacture(this.facture).subscribe(data =>{
      this.sweetAlert.alertSuccessTimer("La facture : " +this.facture.facNum+" a été ajouté ")
      this.router.navigateByUrl('bonHonoraire');
        
    },erro =>{
      this.sweetAlert.alertErrorOk("La facture : " +this.facture.facNum+" n'a pas été ajouté ")
    });
    
  }

}
