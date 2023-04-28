import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { BonHonoraire } from 'src/app/entities/bon-honoraire';
import { Client } from 'src/app/entities/client';
import { LignBH } from 'src/app/entities/lign-bh';
import { Produit } from 'src/app/entities/produit';
import { Calculate } from 'src/app/Utils/calculate';
import { Stock } from 'src/app/Utils/stock';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { ClientService } from '../../client/client.service';
import { ProduitService } from '../../produit/produit.service';
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
  selector: 'app-add-edit-bon-honoraire',
  templateUrl: './add-edit-bon-honoraire.component.html',
  styleUrls: ['./add-edit-bon-honoraire.component.css']
})
export class AddEditBonHonoraireComponent implements OnInit {


  formInfosBon: FormGroup;
  formLigneBon: FormGroup;
  displayedColumns: string[] = ['reference','designation', 'prixUnitaire','quantite', 'montantHt', 'montantTva','montantTtc','actions'];
  dataList: Array<DataList> = [] ;
  clients : Client[] ;
  produits : Produit[];
  client: Client;
  produit: Produit;
  bonHonoraire : BonHonoraire = new  BonHonoraire();
  calculate: Calculate = new Calculate();
  dataSource : MatTableDataSource<DataList>;
  lignBH : LignBH [];
 
  panelOpenState = false;

  totaleQuantite: number;
  totaleMontantHt: number;
  totaleTauxTva: number;
  totaleMontantTtc: number;
  
  stock : Stock = new Stock(this.produitService);
  
  filteredProduits: Observable<Produit[]>;
  filteredClients: Observable<Client[]>;
  nameBtn: string;
  isAddMode: boolean;
  id : number;
  isSelected : boolean;
  isAddLigneMode: boolean = true;
  currentIndex : number ;
  isValide : boolean = false;
  sweetAlert : SweetAlert = new SweetAlert();

  @ViewChild('panel', {static: true, read: MatExpansionPanel}) panel: MatExpansionPanel;

  constructor(private _formBuilder: FormBuilder, private bonHonoraireService : BonHonoraireService, private clientService :ClientService, private produitService : ProduitService, private router: Router,private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {

    this.isSelected = false;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.declareFormInfosBon();
    this.declareFormLigneBon();
    if(this.isAddMode){

      this.setNextBonHonoraire();
      this.setControllers();
      
    }
    else{
      this.setControllers();
      this.getBonHonoraire();
      
    }
    
  }

  declareFormInfosBon() {
    this.formInfosBon = this._formBuilder.group({
      client:['', Validators.required],
      codeC:['', Validators.required],
      bonHNum : ['', Validators.required],
      facBonNum:null,
      dateBh: [new Date(), Validators.required]
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

  filterClient(){
    this.filteredClients = this.formInfosBon.controls['client'].valueChanges.pipe(
      startWith(''),
      map(f => (f ? this._filterClient(f) : this.clients.slice())),
    );
  }

  private _filterProduits(value: string): Produit[] {
    
    if (typeof value === 'string'){

    return this.produits.filter(p => (p.reference+p.designation).toLowerCase().includes(value.toLowerCase())) ;

    }
    return this.produits.filter(p => (p.reference+p.designation).toLowerCase().includes(value)) ;
    
  }

  private _filterClient(value: string): Client[] {
    
    if (typeof value === 'string'){

    return this.clients.filter(f => f.nom.toLowerCase().includes(value.toLowerCase())) ;

    }
    return this.clients.filter(f => f.nom.toLowerCase().includes(value)) ;
    
  }
  
  getOptionTextProduit(p: any) {
      if(p === ""){
        return "";
      }
      else{
        return p.reference+" -- "+p.designation ;
      }
  }
  
  getOptionTextClient(f: any) {
    if(f === ""){
      return "";
    }
    else{
      return f.nom ;
    }
  }
  

  getBonHonoraire(){
    this.bonHonoraireService.getBonHonoraireById(this.id).subscribe(data =>{

      this.bonHonoraire = data;
      
      this.isValide = this.bonHonoraire.valide;
      this.dataList = (this.bonHonoraire.listLignBH as any) ;
      console.log( this.dataList )
      // delete from select search produit when produit exist in lignBonHonoraire
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
        client: this.bonHonoraire.client,
        codeF: this.bonHonoraire.client.codeC,
        bonHNum: this.bonHonoraire.bonHNum,
        //facBonNum:this.bonHonoraire.facBonNum,
        dateBh: this.bonHonoraire.dateBh
      })

      
      
    });
    
  }


  resetFormLigneBA(){
    this.isAddLigneMode = true;
  }

  setControllers() {

    this.clientService.getClientList().subscribe( data =>{
      this.clients = data;
      console.log(this.clients)
      this.filterClient();
    });

    this.produitService.getAllProduits().subscribe( data =>{
      this.produits = data;
      this.filterProduit();
      
    });
  }

  setNextBonHonoraire(){
    this.bonHonoraireService.getNextBonHNum(this.formInfosBon.controls['dateBh'].value).subscribe(data =>{
      this.formInfosBon.controls['bonHNum'].setValue(data);
   });
  }
  setCurrentBonHonoraire(){
    this.bonHonoraireService.getCurrentBonHNum(this.id,this.formInfosBon.controls['dateBh'].value).subscribe(data =>{
      this.formInfosBon.controls['bonHNum'].setValue(data);
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

  setClient(){
    this.client = this.formInfosBon.controls['client'].value;
    this.formInfosBon.controls['codeC'].setValue(this.client.codeC);
  }
  
  setProduit(){
    this.produit = this.formLigneBon.controls['produit'].value;
    this.formLigneBon.controls['tva'].setValue(this.produit.tva);
    this.formLigneBon.controls['prixUnitaire'].setValue(this.produit.prixVente);
    this.formLigneBon.controls['quantite'].setValue(1);
    this.calculateMontants();
  }

  calculateMontants(){
   if( this.formLigneBon.controls['quantite'].value >= this.produit.quantitieDisponible){
    this.formLigneBon.controls['quantite'].setValue(this.produit.quantitieDisponible)
   }else if(this.formLigneBon.controls['quantite'].value < 0){
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
      console.log( this.dataList)
  
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
      this.bonHonoraire = this.formInfosBon.value;
      this.bonHonoraire.listLignBH  = (this.dataList as any);
      this.bonHonoraire.montantTotal = this.totaleMontantTtc;
      this.bonHonoraire.valide = false;

      this.bonHonoraireService.addBonHonoraire(this.bonHonoraire).subscribe(data =>{
        this.sweetAlert.alertSuccessTimer("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" a été ajouté en brouillon")
        this.router.navigateByUrl('bonHonoraire');
        
      },erro =>{
        this.sweetAlert.alertErrorOk("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" n'a pas été ajouté en brouillon")
      });


    }
    // edit bon achat
    else{

      if(this.bonHonoraire.valide){
        let wait =<boolean> await this.stock.addToStockFromHonoraire(this.bonHonoraire.listLignBH);
      }

      this.bonHonoraire = this.formInfosBon.value;
      this.bonHonoraire.listLignBH  = (this.dataList as any );
      this.bonHonoraire.montantTotal = this.totaleMontantTtc;
      this.bonHonoraire.valide = false;

      this.bonHonoraireService.updateBonHonoraire(this.id,this.bonHonoraire).subscribe(data =>{
        this.sweetAlert.alertSuccessTimer("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" a été modifié en brouillon")
        this.router.navigateByUrl('bonHonoraire');
        
      },erro =>{
        this.sweetAlert.alertErrorOk("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" n'a pas été modifié en brouillon")
      });
      
      
    }

  }

  onValide(){
    //add bon achat
    if(this.isAddMode){
     this.bonHonoraire = this.formInfosBon.value;
      this.bonHonoraire.listLignBH  = (this.dataList as [] );

     
      this.bonHonoraire.montantTotal = this.totaleMontantTtc;
      this.bonHonoraire.valide = true;
      
      this.bonHonoraireService.addBonHonoraire(this.bonHonoraire).subscribe(async data =>{
        //add to stock
        let wait = <boolean> await this.stock.removeFromStockByHonoraire(this.bonHonoraire.listLignBH);
        this.sweetAlert.alertSuccessTimer("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" a été ajouté et validé")
        this.router.navigateByUrl('bonHonoraire');
        
      },erro =>{
        this.sweetAlert.alertErrorOk("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" n'a pas été ajouté et validé")
      });

    }
    //edit bon achat
    else{

      if(this.bonHonoraire.valide){
        //remove from stock
        
        this.bonHonoraireService.getBonHonoraireById(this.id).subscribe(async data =>{
          this.bonHonoraire =data;
          
          let wait =<boolean> await this.stock.addToStockFromHonoraire(this.bonHonoraire.listLignBH);

          //
          this.bonHonoraire = this.formInfosBon.value;
          this.bonHonoraire.listLignBH  = (this.dataList as any );
          this.bonHonoraire.montantTotal = this.totaleMontantTtc;
          this.bonHonoraire.valide = true;

          this.bonHonoraireService.updateBonHonoraire(this.id,this.bonHonoraire).subscribe(async data =>{
            //add to stock
            this.bonHonoraire = data;
            
            
            let wait =<boolean> await this.stock.removeFromStockByHonoraire(this.bonHonoraire.listLignBH);
            
            
            this.sweetAlert.alertSuccessTimer("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" a été modifié et validé")
            this.router.navigateByUrl('bonHonoraire');
            
          },erro =>{
            this.sweetAlert.alertErrorOk("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" n'a pas été modifié et validé")
          });

        })
        

        


      }
      else{
        this.bonHonoraire = this.formInfosBon.value;
        this.bonHonoraire.listLignBH  = (this.dataList as any );
        this.bonHonoraire.montantTotal = this.totaleMontantTtc;
        this.bonHonoraire.valide = true;

        this.bonHonoraireService.updateBonHonoraire(this.id,this.bonHonoraire).subscribe(async data =>{
          //add to stock
          let wait =<boolean> await this.stock.removeFromStockByHonoraire(this.bonHonoraire.listLignBH);
          this.sweetAlert.alertSuccessTimer("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" a été modifié et validé")
          this.router.navigateByUrl('bonHonoraire');
            
        },erro =>{
            this.sweetAlert.alertErrorOk("Le bon d'honoraire : " +this.bonHonoraire.bonHNum+" n'a pas été modifié et validé")
        });

      }
      

    }
    

  }


}
