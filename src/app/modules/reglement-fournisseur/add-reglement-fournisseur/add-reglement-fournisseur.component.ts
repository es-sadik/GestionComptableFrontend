import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { BonAchat } from 'src/app/entities/bon-achat';
import { Fournisseur } from 'src/app/entities/fournisseur';
import { ReglementFournisseur } from 'src/app/entities/reglement-fournisseur';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { BonAchatService } from '../../bon-achat/bon-achat.service';
import { FournisseurService } from '../../fournisseur/fournisseur.service';
import { ReglementFournisseurService } from '../reglement-fournisseur.service';
 
@Component({
  selector: 'app-add-reglement-fournisseur',
  templateUrl: './add-reglement-fournisseur.component.html',
  styleUrls: ['./add-reglement-fournisseur.component.css']
})

export class AddReglementFournisseurComponent implements OnInit {

  formInfosFournisseur: FormGroup;
  formInfosReglement: FormGroup;


  fournisseurs : Fournisseur[] ;
  fournisseur: Fournisseur = new Fournisseur();
  filteredFournisseurs: Observable<Fournisseur[]>;
  listReglementFournisseur :ReglementFournisseur[] = [];

  displayedColumns: string[] = ['BonNum','Date', 'MontantTotal', 'MontantPayer','RestePayer','Avance','Reste','Status'];


 dataSource : MatTableDataSource<any>;
 dataList: Array<any> = [] ;


  bonAchats : BonAchat[]
  bonAchat : BonAchat = new BonAchat()

  reglementFournisseur : ReglementFournisseur = new ReglementFournisseur()



  statusGeneral : string
  status : Array<boolean> = [] 

  Avance : number
  avanceGeneral    : number 
  avances           : Array<number> = [] 
  rest             : number 
  restes : Array<number> = [] 

  totaleMontants     : number
  totaleMontantPayer : number
  totaleRestePayer   : number
  totaleAvances      : number = 0
  totaleRestes       : number
  sweetAlert: SweetAlert = new SweetAlert();

  constructor(private _formBuilder: FormBuilder , private fournisseurService :FournisseurService ,private bonAchatService : BonAchatService, private reglementFournisseurService : ReglementFournisseurService,private router: Router) { }

  ngOnInit(): void {
    this.declareFormInfosFournisseur();
    this.declareFormReglement();
    this.setControllers();
    
  }

  declareFormInfosFournisseur() {
    this.formInfosFournisseur = this._formBuilder.group({
      fournisseur:['', Validators.required],
      codeF:['', Validators.required],
      datePayment: [new Date(), Validators.required]
      });
  }
  declareFormReglement() {
    this.formInfosReglement = this._formBuilder.group({
      mode_reglement:['', Validators.required],
      avanceGeneral:['', Validators.required],
      reste:['', ],
      statusGeneral:['', ],
      });
  }
  setFornisseur(){
    this.fournisseur = this.formInfosFournisseur.controls['fournisseur'].value;
    this.formInfosFournisseur.controls['codeF'].setValue(this.fournisseur.codeF);
    this.getListBonAchatByFournisseur(this.fournisseur)
  }

  getOptionTextFournisseur(f: any) {
    if(f === ""){
      return "";
    }
    else{
      return f.nom ;
    }
  }
  
  filterFournisseur(){
    this.filteredFournisseurs = this.formInfosFournisseur.controls['fournisseur'].valueChanges.pipe(
      startWith(''),
      map(f => (f ? this._filterFournisseur(f) : this.fournisseurs.slice())),
    );
  }

  private _filterFournisseur(value: string): Fournisseur[] {
    
    if (typeof value === 'string'){

    return this.fournisseurs.filter(f => f.nom.toLowerCase().includes(value.toLowerCase())) ;

    }
    return this.fournisseurs.filter(f => f.nom.toLowerCase().includes(value)) ;
    
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

  
  setControllers() {

    this.fournisseurService.getAllFournisseurs().subscribe( data =>{
      this.fournisseurs = data;
      
      this.filterFournisseur();
    });
  }

  getListBonAchatByFournisseur( fournisseur : Fournisseur){
    this.bonAchatService.getListBonAchatByFournisseur(fournisseur).subscribe(data =>{
      this.bonAchats = data
      
      this.dataSource = new MatTableDataSource(this.bonAchats);
      this.dataList = this.bonAchats
      this.totale()
     
     
      this.avanceGeneral = 0
      this.dataList.forEach((currentValue, index) => {
        this.status[index] = false ;
        this.avances[index] = 0
        this.restes[index]=(currentValue.montantTotal - currentValue.montantPayer )
    });
   //   this.calculeResteGeneral()
     
    })
  }

  // calcule Totale :
  totale(){
    this.totaleMontants=0
    this.totaleMontantPayer=0
    this.totaleRestePayer=0
    this.totaleAvances=0
    this.totaleRestes=0    
    this.dataList.forEach((currentValue, index) => {

      this.totaleMontants     += currentValue.montantTotal
      this.totaleMontantPayer += currentValue.montantPayer
      this.totaleRestePayer   += (currentValue.montantTotal -currentValue.montantPayer )   
    });
    this.totaleRestes = this.totaleRestePayer
    this.formInfosReglement.controls['reste'].setValue(this.totaleRestes)
  
    if(this.totaleRestes == 0){
      this.statusGeneral = 'R'
     }else{
      this.statusGeneral = 'NR'
     }
     this.formInfosReglement.controls['statusGeneral'].setValue(this.statusGeneral)
  }

  // calcule des restes :
  calculeResteGeneral(){
    
     this.statusGeneral = 'NR'
     this.avanceGeneral = this.formInfosReglement.controls['avanceGeneral'].value
     if(this.formInfosReglement.controls['avanceGeneral'].value == ''){
        this.avances[0] = 0
     }
     if(this.avanceGeneral > this.totaleRestePayer){
      this.statusGeneral = 'R'
      this.avanceGeneral  =  this.totaleRestePayer
      this.formInfosReglement.controls['avanceGeneral'].setValue(this.avanceGeneral)
     
    }else if(this.avanceGeneral <0){
      this.formInfosReglement.controls['avanceGeneral'].setValue(0)
       
     }

     this.formInfosReglement.controls['statusGeneral'].setValue(this.statusGeneral)


    let restGeneral   = this.totaleRestePayer -  this.avanceGeneral
    this.formInfosReglement.controls['reste'].setValue(restGeneral)
   // rest chak row :
   this.dataList.forEach((currentValue, index) => {
    this.avances[index] = 0
    this.restes[index]=(currentValue.montantTotal - currentValue.montantPayer )
  });
    this.avances[0]=this.avanceGeneral
    this.totaleAvances =this.avanceGeneral
    this.dataList.forEach((currentValue, index) => {

      if(this.avances[index] >= this.restes[index]){
        console.log('index : ',index)
        this.status [index] = true ;
        this.avances[index] = this.restes[index]
        this.avances[index + 1]= this.avanceGeneral - this.restes[index]
        this.avanceGeneral = this.avanceGeneral - this.restes[index]
        this.restes[index]=(currentValue.montantTotal - currentValue.montantPayer ) - this.avances[index]

      }else{
        this.status [index] = false ;

      this.restes[index]=(currentValue.montantTotal - currentValue.montantPayer ) - this.avances[index]
      }
    });
    this.totaleRestes =0
    this.dataList.forEach((currentValue, index) => {
     this.totaleRestes+=this.restes[index]
    });
    

  }

  //
  calculeReste(restPayer : number ,avance : string ,index : number){
   // this.calculeResteGeneral()
    
    if(+avance >= restPayer){
      this.avances[index] = restPayer
      this.restes[index] = 0
      this.status[index] = true
    }else{
      this.restes[index] = restPayer - +avance
      this.status[index] = false

    }
      this.totaleRestes =0
      this.dataList.forEach((currentValue, i) => {
        this.totaleRestes+=this.restes[i]
       });
    this.formInfosReglement.controls['reste'].setValue(this.totaleRestes)
    this.calculeTotaleAvances() ;
    if(this.totaleRestes >= this.totaleAvances){
      this.statusGeneral = 'NR'
     }else{
      this.statusGeneral = 'R'
     }
     this.formInfosReglement.controls['statusGeneral'].setValue(this.statusGeneral)

  }

  calculeTotaleAvances(){
    this.totaleAvances =0
    this.dataList.forEach((currentValue, i) => {
      this.totaleAvances+=this.avances[i]
     });
    this.formInfosReglement.controls['avanceGeneral'].setValue(this.totaleAvances)
  }

  

  updateAllBonAchats(){
    this.bonAchats.forEach((currentValue, index) =>{
       if( this.avances[index] != 0 && this.avances[index] != null ){  
          if( currentValue.status != this.status[index] ){
           currentValue.status = this.status[index]
          }
           currentValue.montantPayer += this.avances[index]
          this.bonAchatService.updateBonAchatFromReglementFournisseur(currentValue.idBa,currentValue).subscribe( data  =>{
                    
          
          }) 
          this.addReglementFournisseur(currentValue,index);
          
       }
    })    

  }

  // add reglement fournisseur :
  addReglementFournisseur(bonAchat : BonAchat , index : number){
    
    let regF :ReglementFournisseur = new ReglementFournisseur();
    regF.bonAchat = bonAchat
    regF.avance = this.avances[index]
    regF.reste = this.restes[index]
    regF.status = this.status[index];
    regF.datePayment = this.formInfosFournisseur.controls['datePayment'].value
    regF.modePaymant = this.formInfosReglement.controls['mode_reglement'].value
    this.listReglementFournisseur.push(regF);

  }

  addListReglementFournisseur(){

    this.reglementFournisseurService.addListReglementFournisseur(this.listReglementFournisseur).subscribe(data =>{
      
      this.sweetAlert.alertSuccessTimer(this.listReglementFournisseur.length+" reglement(s) ont été ajoutés")
      this.router.navigateByUrl('reglementFournisseur');
      
    },erro =>{
      this.sweetAlert.alertErrorOk("Le(s) reglement(s) n'ont pas été ajoutés")
    });

  }


  onSubmit(){
    this.updateAllBonAchats();
    this.addListReglementFournisseur();
  }

 
}
