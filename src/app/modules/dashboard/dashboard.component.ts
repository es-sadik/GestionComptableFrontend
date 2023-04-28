import { Component, OnInit } from '@angular/core';

import { StatistiqueService } from './statistique.service';

export interface DataCouted{
  bonHonoraire: number;
  categorie: number;
  produit: number;
  bonAchat: number;
  facture: number;
  client: number;
  fournisseur: number;
  reglementFournisseur: number;
  reglementClient: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataCounted: DataCouted  = {
    bonHonoraire: 0,
    categorie: 0,
    produit: 0,
    bonAchat: 0,
    facture: 0,
    client: 0,
    fournisseur: 0,
    reglementFournisseur: 0,
    reglementClient: 0
  };

  

  constructor(private statistiqueService: StatistiqueService) {
  }
  ngOnInit(): void {

    this.setNumbersOfAll();

  }

  setNumbersOfAll(){
    this.statistiqueService.getNumbersOfAll().subscribe(data =>{
      this.dataCounted = data;
    })
  }

  




  
}


  


