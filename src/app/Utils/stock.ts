import { BonAchat } from "../entities/bon-achat";
import { BonHonoraire } from "../entities/bon-honoraire";
import { LignBA } from "../entities/lign-ba";
import { LignBH } from "../entities/lign-bh";
import { Produit } from "../entities/produit";
import { ProduitService } from "../modules/produit/produit.service";

export class Stock{
    produit :Produit [];
    constructor(private produitService : ProduitService){

    }



    // Bon Achat  :

    addToStockFromBonAchat(listLignBA: LignBA[]):any{
        
        listLignBA.forEach(currentValue => {
            currentValue.produit.quantitieDisponible += currentValue.quantite;
    
            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
                console.log(data)
                
            }, error =>{
                alert("SA")
              });
          });
          return true;

    }

    removeFromStockByBonAchat(listLignBA: LignBA[]): any{ 
        
        listLignBA.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible -= currentValue.quantite;

            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
                console.log(data)
                
            }, error =>{
                alert("SR")
            });

          });

        return true;

    }

    

    // Bon Honoraire :

    
    addToStockFromHonoraire(listLignBH: LignBH[]) : any{
        listLignBH.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible += currentValue.quantite;
    
            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
            
            }, error =>{
                alert("SA")
              });
          });

          return true;
    }

    removeFromStockByHonoraire(listLignBH: LignBH[]) :any {
        
        listLignBH.forEach(currentValue => {
            
            currentValue.produit.quantitieDisponible -= currentValue.quantite;

            this.produitService.updateProduit(currentValue.produit.reference,currentValue.produit).subscribe(data => {
                
            }, error =>{
                alert("SR")
            });

          });

          return true;
    }

    

}