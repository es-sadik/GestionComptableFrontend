import { Client } from "./client"
import { Facture } from "./facture"
import { LignBH } from "./lign-bh"

export class BonHonoraire{

    idBh : number
    dateBh  : Date
    bonHNum : string
    valide : boolean
    status : boolean
    montantTotal : number
    montantPayer : number
    client : Client
    facture : Facture
    listLignBH : LignBH[]
    
}