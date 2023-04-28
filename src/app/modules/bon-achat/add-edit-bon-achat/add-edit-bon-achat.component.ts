import {  Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import {  registerLocaleData } from '@angular/common';
registerLocaleData(localeFr, 'fr');


import { BonAchat } from 'src/app/entities/bon-achat';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { LignBA } from 'src/app/entities/lign-ba';
import { Produit } from 'src/app/entities/produit';
import { Calculate } from 'src/app/Utils/calculate';
import { FournisseurService } from '../../fournisseur/fournisseur.service';
import { ProduitService } from '../../produit/produit.service';
import { BonAchatService } from '../bon-achat.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Stock } from 'src/app/Utils/stock';
import { SweetAlert } from 'src/app/Utils/sweet-alert';

export interface DataList {
  produit: Produit;
  prixUnitaire: number;
  quantite: number;
  montantHt : number;
  montantTva:number;
  montantTtc:number;
}  

@Component({
  selector: 'app-add-edit-bon-achat',
  templateUrl: './add-edit-bon-achat.component.html',
  styleUrls: ['./add-edit-bon-achat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditBonAchatComponent implements OnInit {
  
  formInfosBon: FormGroup;
  formLigneBon: FormGroup;
  displayedColumns: string[] = ['reference','designation', 'prixUnitaire','quantite', 'montantHt', 'montantTva','montantTtc','actions'];
  dataList: Array<any> = [] ;
  fournisseurs : Fournisseur[] ;
  produits : Produit[];
  fournisseur: Fournisseur;
  produit: Produit;
  bonAchat : BonAchat = new  BonAchat();
  calculate: Calculate = new Calculate();
  dataSource : MatTableDataSource<DataList>;
  lignBA : LignBA [];

  panelOpenState = false;

  totaleQuantite: number;
  totaleMontantHt: number;
  totaleTauxTva: number;
  totaleMontantTtc: number;
  
  stock : Stock = new Stock(this.produitService);
  
  filteredProduits: Observable<Produit[]>;
  filteredFournisseurs: Observable<Fournisseur[]>;
  nameBtn: string;
  isAddMode: boolean;
  id : number;
  isSelected : boolean;
  isAddLigneMode: boolean = true;
  currentIndex : number ;
  isValide : boolean = false;
  sweetAlert : SweetAlert = new SweetAlert();


  @ViewChild('panel', {static: true, read: MatExpansionPanel}) panel: MatExpansionPanel;

  constructor(private _formBuilder: FormBuilder, private bonAchatService : BonAchatService, private fournisseurService :FournisseurService, private produitService : ProduitService, private router: Router,private route: ActivatedRoute) {
    
  }
  

  
  

  ngOnInit(): void {

    this.isSelected = false;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.declareFormInfosBon();
    this.declareFormLigneBon();
    if(this.isAddMode){

      this.setNextBonAchat();
      this.setControllers();
      
    }
    else{
      this.setControllers();
      this.getBonAchat();

    }
    
  }

  declareFormInfosBon() {
    this.formInfosBon = this._formBuilder.group({
      fournisseur:['', Validators.required],
      codeF:['', Validators.required],
      bonANum : ['', Validators.required],
      facBonNum:null,
      dateBa: [new Date(), Validators.required]
      });

  }

  declareFormLigneBon(){
    this.formLigneBon = this._formBuilder.group({
      produit: ['', Validators.required],
      quantite: ['', Validators.required],
      tva: ['', Validators.required],
      prixUnitaire : ['', Validators.required],
      montantHt : null,
      montantTva:null,
      montantTtc : null,
    });
  }

  filterProduit(){
    this.filteredProduits = this.formLigneBon.controls['produit'].valueChanges.pipe(
      startWith(''),
      map(p => (p ? this._filterProduits(p) : this.produits.slice())),
    );
  }

  filterFournisseur(){
    this.filteredFournisseurs = this.formInfosBon.controls['fournisseur'].valueChanges.pipe(
      startWith(''),
      map(f => (f ? this._filterFournisseur(f) : this.fournisseurs.slice())),
    );
  }

  private _filterProduits(value: string): Produit[] {
    
    if (typeof value === 'string'){

    return this.produits.filter(p => (p.reference+p.designation).toLowerCase().includes(value.toLowerCase())) ;

    }
    return this.produits.filter(p => (p.reference+p.designation).toLowerCase().includes(value)) ;
    
  }

  private _filterFournisseur(value: string): Fournisseur[] {
    
    if (typeof value === 'string'){

    return this.fournisseurs.filter(f => f.nom.toLowerCase().includes(value.toLowerCase())) ;

    }
    return this.fournisseurs.filter(f => f.nom.toLowerCase().includes(value)) ;
    
  }
  
  getOptionTextProduit(p: any) {
      if(p === ""){
        return "";
      }
      else{
        return p.reference+" -- "+p.designation ;
      }
  }
  
  getOptionTextFournisseur(f: any) {
    if(f === ""){
      return "";
    }
    else{
      return f.nom ;
    }
}
  

  getBonAchat(){
    this.bonAchatService.getBonAchatById(this.id).subscribe(data =>{

      this.bonAchat = data;
      this.isValide = this.bonAchat.valide;
      this.dataList = this.bonAchat.listLignBA;
      
      // delete from select search produit when produit exist in lignBonAchat
      this.dataList.forEach(currentData => {
        
        this.produits.forEach((currentProduit,index) => {
            if(currentProduit.designation == currentData.produit.designation){
              this.produits.splice(index,1);
            }
          
          });
        
      });

      this.filterProduit()
      
      this.dataList.forEach(element => {
        this.calculate.calculateMontants(element.prixUnitaire,element.quantite,element.produit.tva);
        element.montantHt = this.calculate.montantHt;
        element.montantTva = this.calculate.montantTva;
      });


      this.totale();
      this.dataSource = new MatTableDataSource(this.dataList);
      this.formInfosBon.patchValue({
        fournisseur: this.bonAchat.fournisseur,
        codeF: this.bonAchat.fournisseur.codeF,
        bonANum: this.bonAchat.bonANum,
        facBonNum:this.bonAchat.facBonNum,
        dateBa: this.bonAchat.dateBa
      })

      
      
    });
    
  }


  resetFormLigneBA(){
    this.isAddLigneMode = true;
  }

  setControllers() {

    this.fournisseurService.getAllFournisseurs().subscribe( data =>{
      this.fournisseurs = data;
      this.filterFournisseur();
    });

    this.produitService.getAllProduits().subscribe( data =>{
      this.produits = data;
      this.filterProduit();
      
    });
  }

  setNextBonAchat(){
    this.bonAchatService.getNextBonANum(this.formInfosBon.controls['dateBa'].value).subscribe(data =>{
      this.formInfosBon.controls['bonANum'].setValue(data);
   });
  }
  setCurrentBonAchat(){
    this.bonAchatService.getCurrentBonANum(this.id,this.formInfosBon.controls['dateBa'].value).subscribe(data =>{
      this.formInfosBon.controls['bonANum'].setValue(data);
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

  setFornisseur(){
    this.fournisseur = this.formInfosBon.controls['fournisseur'].value;
    this.formInfosBon.controls['codeF'].setValue(this.fournisseur.codeF);
  }
  
  setProduit(){
    this.produit = this.formLigneBon.controls['produit'].value;
    this.formLigneBon.controls['tva'].setValue(this.produit.tva);
    this.formLigneBon.controls['prixUnitaire'].setValue(this.produit.prixAchat);
    this.formLigneBon.controls['quantite'].setValue(1);
    this.calculateMontants();
  }

  calculateMontants(){
    if( this.formLigneBon.controls['quantite'].value < 0){
      this.formLigneBon.controls['quantite'].setValue(1)
     }

    this.calculate.calculateMontants(this.formLigneBon.controls['prixUnitaire'].value,this.formLigneBon.controls['quantite'].value,this.formLigneBon.controls['tva'].value);
      
    this.formLigneBon.patchValue({
        montantHt : this.calculate.montantHt,
        montantTva: this.calculate.montantTva,
        montantTtc : this.calculate.montantTtc
      });
      
        
    
  }

  addEditLigne(){
    if(this.isAddLigneMode){
      this.dataList.push(this.formLigneBon.value);
      console.log( this.dataList)
      this.produits.forEach((element,index) => {

        if(element.designation == this.formLigneBon.controls['produit'].value.designation){
          this.produits.splice(index,1);
        }
        
      });
      
      this.dataSource = new MatTableDataSource(this.dataList);
      this.totale();
    }
    else{
      
      this.dataList[this.currentIndex] = this.formLigneBon.value;
      this.dataSource = new MatTableDataSource(this.dataList);
      this.totale();
      this.isAddLigneMode = true;
    }

    this.declareFormLigneBon();
    this.filterProduit();
      
    
  }

  deleteLigne(index: number){
    
    this.produits.push(this.dataList[index].produit);

    this.filterProduit();
    
    this.dataList.splice(index,1);
    this.dataSource = new MatTableDataSource(this.dataList);
    this.totale();

  }

  editLigne(index:number){
    if(!this.isAddMode){
      this.panel.open();
    }
    this.isAddLigneMode = false;
    this.currentIndex = index;
    
    this.formLigneBon.patchValue({
      produit: this.dataList[index].produit,
      quantite: this.dataList[index].quantite,
      tva: this.dataList[index].produit.tva,
      prixUnitaire : this.dataList[index].prixUnitaire,
      montantHt : this.dataList[index].montantHt,
      montantTva:this.dataList[index].montantTva,
      montantTtc : this.dataList[index].montantTtc,
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

  async onEnregistre(){
    //add bon achat
    if(this.isAddMode){
      this.bonAchat = this.formInfosBon.value;
      this.bonAchat.listLignBA  = this.dataList;
      this.bonAchat.montantTotal = this.totaleMontantTtc;
      this.bonAchat.valide = false;

      this.bonAchatService.addBonAchat(this.bonAchat).subscribe(data =>{
        
        
        this.sweetAlert.alertSuccessTimer("Le bon d'achat : " +this.bonAchat.bonANum+" a été ajouté en brouillon")
        this.router.navigateByUrl('bonAchat');
        
      },erro =>{
        this.sweetAlert.alertErrorOk("Le bon d'achat : " +this.bonAchat.bonANum+" n'a pas été ajouté en brouillon")
      });
  

    }
    // edit bon achat
    else{

      if(this.bonAchat.valide){
        let wait =<boolean> await this.stock.removeFromStockByBonAchat(this.bonAchat.listLignBA);
      }

      this.bonAchat = this.formInfosBon.value;
      this.bonAchat.listLignBA  = this.dataList;
      this.bonAchat.montantTotal = this.totaleMontantTtc;
      this.bonAchat.valide = false;


      this.bonAchatService.updateBonAchat(this.id,this.bonAchat).subscribe(data =>{

        this.sweetAlert.alertSuccessTimer("Le bon d'achat : " +this.bonAchat.bonANum+" a été modifié en brouillon")
        this.router.navigateByUrl('bonAchat');
        
      },erro =>{
        this.sweetAlert.alertErrorOk("Le bon d'achat : " +this.bonAchat.bonANum+" n'a pas été modifié en brouillon")
      });
      
      
    }

  }

  async onValide(){
    //add bon achat
    if(this.isAddMode){
      this.bonAchat = this.formInfosBon.value;
      this.bonAchat.listLignBA  = this.dataList;
      
      
      this.bonAchat.montantTotal = this.totaleMontantTtc;
      this.bonAchat.valide = true;
      
      this.bonAchatService.addBonAchat(this.bonAchat).subscribe(async data =>{
        //add to stock
        let wait = <boolean> await this.stock.addToStockFromBonAchat(this.bonAchat.listLignBA);
        this.sweetAlert.alertSuccessTimer("Le bon d'achat : " +this.bonAchat.bonANum+" a été ajouté et validé")
        this.router.navigateByUrl('bonAchat');
        
      },erro =>{
        this.sweetAlert.alertErrorOk("Le bon d'achat : " +this.bonAchat.bonANum+" n'a pas été ajouté et validé")
      });
    }
    //edit bon achat
    else{

      if(this.bonAchat.valide){
        //remove from stock
        
        this.bonAchatService.getBonAchatById(this.id).subscribe(async data =>{
          this.bonAchat =data;
          
          let wait =<boolean> await this.stock.removeFromStockByBonAchat(this.bonAchat.listLignBA);

          //
          this.bonAchat = this.formInfosBon.value;
          this.bonAchat.listLignBA  = this.dataList;
          this.bonAchat.montantTotal = this.totaleMontantTtc;
          this.bonAchat.valide = true;

          this.bonAchatService.updateBonAchat(this.id,this.bonAchat).subscribe(async data =>{
            //add to stock
            this.bonAchat = data;
            
            
            let wait =<boolean> await this.stock.addToStockFromBonAchat(this.bonAchat.listLignBA);
            
            
            this.sweetAlert.alertSuccessTimer("Le bon d'achat : " +this.bonAchat.bonANum+" a été modifié et validé")
            this.router.navigateByUrl('bonAchat');
        
          },erro =>{
            this.sweetAlert.alertErrorOk("Le bon d'achat : " +this.bonAchat.bonANum+" n'a pas été modifié et validé")
          });
        

        },erro =>{
          this.sweetAlert.alertErrorOk("");
        })
        

        


      }
      else{
        this.bonAchat = this.formInfosBon.value;
        this.bonAchat.listLignBA  = this.dataList;
        this.bonAchat.montantTotal = this.totaleMontantTtc;
        this.bonAchat.valide = true;

        this.bonAchatService.updateBonAchat(this.id,this.bonAchat).subscribe(async data =>{
          //add to stock
          let wait =<boolean> await this.stock.addToStockFromBonAchat(this.bonAchat.listLignBA);
          this.sweetAlert.alertSuccessTimer("Le bon d'achat : " +this.bonAchat.bonANum+" a été modifié et validé")
          this.router.navigateByUrl('bonAchat');
          
          },erro =>{
            this.sweetAlert.alertErrorOk("Le bon d'achat : " +this.bonAchat.bonANum+" n'a pas été modifié et validé")
          });
    

      }
      

    }
    

  }


}
