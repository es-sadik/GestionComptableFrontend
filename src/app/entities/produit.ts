import { Byte } from "@angular/compiler/src/util";
import { Categorie } from "./categorie";

export class Produit{
     reference            : string ;
     image                : Byte   ;
     designation          : string ;
     description          : string ;
     type                 : string ;
     marque               : string ;
     longueur             : number ;
     largeur              : number ;
     hauteur              : number ;
     poids                : number ;
     surface              : number ;
     volume               : number ;
     prixAchat           : number ;
     prixVente           : number ;
     prixRevient         : number ;
     tva                  : number ;
     quantitieDisponible : number ;
     categorie            : Categorie ;
}