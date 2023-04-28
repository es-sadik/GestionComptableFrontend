export class Calculate{

    montantHt: number;
    montantTva: number;
    montantTtc: number;

    calculateMontants(prixUnitaire: number, quantite: number,tva: number){
        this.montantHt = prixUnitaire * quantite;
        this.montantTva =this.montantHt  * (tva/100);
        this.montantTtc = this.montantHt + this.montantTva;
    }
}