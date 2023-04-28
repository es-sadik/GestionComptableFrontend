import { BonHonoraire } from "./bon-honoraire"

export class Facture{

    idFac : number
    facNum : string
    dateFac : Date
    totalHt : number
    totalTva : number
    totalTtc : number
    bonHonoraire : BonHonoraire
  
}