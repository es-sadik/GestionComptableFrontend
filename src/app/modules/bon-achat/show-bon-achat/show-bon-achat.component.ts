import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BonAchat } from 'src/app/entities/bon-achat';
import { Calculate } from 'src/app/Utils/calculate';
import { DataList } from '../add-edit-bon-achat/add-edit-bon-achat.component';
import { BonAchatService } from '../bon-achat.service';

@Component({
  selector: 'app-show-bon-achat',
  templateUrl: './show-bon-achat.component.html',
  styleUrls: ['./show-bon-achat.component.css']
})
export class ShowBonAchatComponent implements OnInit {
  
  formInfosBon: FormGroup;
  displayedColumns: string[] = ['reference','designation', 'prixUnitaire','quantite', 'montantHt', 'montantTva','montantTtc'];
  dataList: Array<any> = [] ;
  bonAchat : BonAchat = new  BonAchat();
  calculate: Calculate = new Calculate();
  dataSource : MatTableDataSource<DataList>;


  totaleQuantite: number;
  totaleMontantHt: number;
  totaleTauxTva: number;
  totaleMontantTtc: number;

  constructor(private _formBuilder: FormBuilder ,@Inject(MAT_DIALOG_DATA) public id :number ,private dialogRef : MatDialogRef<ShowBonAchatComponent>,private  bonAchatService : BonAchatService) { }

  ngOnInit(): void {
    this.declareFormInfosBon();
    this.getBonAchat();
    
  }

  declareFormInfosBon() {
    this.formInfosBon = this._formBuilder.group({
      nom:['', Validators.required],
      codeF:['', Validators.required],
      bonANum : ['', Validators.required],
      facBonNum:null,
      dateBa: ['', Validators.required]
      });

  }


  getBonAchat(){
    this.bonAchatService.getBonAchatById(this.id).subscribe(data =>{

      this.bonAchat = data;
      this.dataList = this.bonAchat.listLignBA;      

      
      
      this.dataList.forEach(element => {
        this.calculate.calculateMontants(element.prixUnitaire,element.quantite,element.produit.tva);
        element.montantHt = this.calculate.montantHt;
        element.montantTva = this.calculate.montantTva;
      });


      this.totale();

      this.dataSource = new MatTableDataSource(this.dataList);

      this.formInfosBon.patchValue({
        nom: this.bonAchat.fournisseur.nom,
        codeF: this.bonAchat.fournisseur.codeF,
        bonANum: this.bonAchat.bonANum,
        facBonNum:this.bonAchat.facBonNum,
        dateBa: this.bonAchat.dateBa
      })

      
      
    });
    
  }

  totale(){
     
    this.totaleQuantite = 0;
    this.totaleMontantHt = 0;
    this.totaleTauxTva = 0;
    this.totaleMontantTtc = 0;

    this.dataList.forEach((currentValue, index) => {

      this.totaleQuantite +=  currentValue.quantite;
      this.totaleMontantHt += currentValue.montantHt;
      this.totaleTauxTva += currentValue.montantTva;
      this.totaleMontantTtc += currentValue.montantTtc;

    });

  }

}
