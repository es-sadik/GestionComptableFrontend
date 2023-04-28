import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/entities/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private baseUrl ="http://localhost:8084/api/factures";

  constructor(private httpClient: HttpClient) {}

  getNextFactureNum( date : Date ): Observable<any>{
    return this.httpClient.post(`${this.baseUrl+"/next"}`, date,{responseType: 'text'});
  }
 
  getFactureList(): Observable<Facture[]>{
    return this.httpClient.get<Facture[]>(`${this.baseUrl}`);
  }

  getFactureById(idFac : number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/${idFac}`);
  }

  addFacture(bonHonoraire: Facture): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, bonHonoraire);
  }

  deleteFactureById(idFac : number):Observable<Facture>{
   return this.httpClient.delete<Facture>(`${this.baseUrl}/${idFac}`);
  }

}
