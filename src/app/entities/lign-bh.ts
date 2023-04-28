import { BonHonoraire } from "./bon-honoraire"
import { Produit } from "./produit"

export class LignBH{
    
    idLignH : number
    quantite : number
    montantTtc : number
    prixUnitaire : number
    produit : Produit
    bonHonoraire : BonHonoraire
}