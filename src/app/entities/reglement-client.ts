import { BonHonoraire } from "./bon-honoraire"

export class ReglementClient{

    idRegC : number
    codeRC : string
    modePaymant : string
    status : boolean
    avance : number
    reste  : number 
    datePayment : Date
    bonHonoraire : BonHonoraire
    
}