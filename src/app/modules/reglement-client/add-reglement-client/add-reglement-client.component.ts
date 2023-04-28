import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { BonHonoraire } from 'src/app/entities/bon-honoraire';
import { Client } from 'src/app/entities/client';
import { ReglementClient } from 'src/app/entities/reglement-client';
import { SweetAlert } from 'src/app/Utils/sweet-alert';
import { BonHonoraireService } from '../../bon-honoraire/bon-honoraire.service';
import { ClientService } from '../../client/client.service';
import { ReglementClientService } from '../reglement-client.service';

@Component({
  selector: 'app-add-reglement-client',
  templateUrl: './add-reglement-client.component.html',
  styleUrls: ['./add-reglement-client.component.css']
})
export class AddReglementClientComponent implements OnInit {
  formInfosClient: FormGroup;
  formInfosReglement: FormGroup;


  clients : Client[] ;
  client: Client = new Client();
  filteredClients: Observable<Client[]>;

  displayedColumns: string[] = ['BonNum','Date', 'MontantTotal', 'MontantPayer','RestePayer','Avance','Reste','Status'];


 dataSource : MatTableDataSource<any>;
 dataList: Array<any> = [] ;


  bonBonHonoraires : BonHonoraire[]
  bonHonoraire : BonHonoraire = new BonHonoraire()

  reglementClient : ReglementClient = new ReglementClient()
  listReglementClient :ReglementClient[] = [];



  statusGeneral : string =''
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
  sweetAlert : SweetAlert = new SweetAlert();

  constructor(private _formBuilder: FormBuilder , private clientService :ClientService ,private bonHonoraireService : BonHonoraireService, private reglementClientService : ReglementClientService,private router: Router,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.declareFormInfosClient();
    this.declareFormReglement();
    this.setControllers();
    
  }

  declareFormInfosClient() {
    this.formInfosClient = this._formBuilder.group({
      client:['', Validators.required],
      codeC:['', Validators.required],
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
    this.client = this.formInfosClient.controls['client'].value;
    this.formInfosClient.controls['codeC'].setValue(this.client.codeC);
    this.getListBonHonoraireByClient(this.client)
  }

  getOptionTextClient(f: any) {
    if(f === ""){
      return "";
    }
    else{
      return f.nom ;
    }
  }
  
  filterClient(){
    this.filteredClients = this.formInfosClient.controls['client'].valueChanges.pipe(
      startWith(''),
      map(c => (c ? this._filterClient(c) : this.clients.slice())),
    );
  }

  private _filterClient(value: string): Client[] {
    
    if (typeof value === 'string'){

    return this.clients.filter(f => f.nom.toLowerCase().includes(value.toLowerCase())) ;

    }
    return this.clients.filter(f => f.nom.toLowerCase().includes(value)) ;
    
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

    this.clientService.getClientList().subscribe( data =>{
      this.clients = data;
      
      this.filterClient();
    });
  }

  getListBonHonoraireByClient( client : Client){
    this.bonHonoraireService.getListBonHonoraireByClient(client).subscribe(data =>{
      this.bonBonHonoraires = data
      
      this.dataSource = new MatTableDataSource(this.bonBonHonoraires);
      this.dataList = this.bonBonHonoraires
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

  


  updateAllBonHonoraires(){
    this.bonBonHonoraires.forEach((currentValue, index) =>{
       if( this.avances[index] != 0 && this.avances[index] != null){  

          if( currentValue.status != this.status[index] ){
           currentValue.status = this.status[index]
          }

          currentValue.montantPayer += this.avances[index]

          this.bonHonoraireService.updateBonHonoraireFromReglementClient(currentValue.idBh,currentValue).subscribe(data =>{
               
          }) 

          this.addReglementClient(currentValue,index);  
       }
    });

      
  

  //  this.getListBonHonoraireByClient(this.client)

  }

  // add reglement client :
  addReglementClient(bonHonoraire : BonHonoraire , index : number){
    let regC :ReglementClient = new ReglementClient();
    regC.bonHonoraire = bonHonoraire
    regC.avance = this.avances[index]
    regC.reste = this.restes[index]
    regC.status = this.status[index];
    regC.datePayment = this.formInfosClient.controls['datePayment'].value
    regC.modePaymant = this.formInfosReglement.controls['mode_reglement'].value

    this.listReglementClient.push(regC);

  }

  addListReglementClient(){

    this.reglementClientService.addListReglementClient(this.listReglementClient).subscribe(data =>{
      
      this.sweetAlert.alertSuccessTimer( this.listReglementClient.length+" reglement(s) ont été ajoutés")
      this.router.navigateByUrl('reglementClient');
      
    },erro =>{
      this.sweetAlert.alertErrorOk("Le(s) reglement(s) n'ont pas été ajoutés")
    });

  }

  onSubmit(){
    this.updateAllBonHonoraires();
    this.addListReglementClient();
  }
 

}
