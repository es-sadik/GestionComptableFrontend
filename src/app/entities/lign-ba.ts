import { BonAchat } from "./bon-achat";
import { Produit } from "./produit";

export class LignBA{
    idLignA : number;
    quantite : number;
    montantTtc : number;
    prixUnitaire : number;
    produit: Produit;
    bonAchat: BonAchat; 
    
}