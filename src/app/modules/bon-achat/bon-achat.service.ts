import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BonAchat } from 'src/app/entities/bon-achat';
import { Fournisseur } from 'src/app/entities/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class BonAchatService {

  private baseUrl ="http://localhost:8084/api/bonAchat";
  private lignBAUrl ="http://localhost:8084/api/lignBA";


  constructor(private httpClient: HttpClient) {}

  getNextBonANum(date: Date):Observable<any>{
    return this.httpClient.post(`${this.baseUrl+"/next"}`, date,{responseType: 'text'});
  }
  getCurrentBonANum(id:number ,date: Date):Observable<any>{
    return this.httpClient.post(`${this.baseUrl+"/current"}/${id}`, date,{responseType: 'text'});
  }
  getBonAchatList(): Observable<BonAchat[]>{
    return this.httpClient.get<BonAchat[]>(`${this.baseUrl}`);
  }

  getBonAchatById(id :number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }

  addBonAchat(bonAchat: BonAchat): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, bonAchat);
  }
  
  updateBonAchat( id :number, bonAchat: BonAchat) :Observable<BonAchat>{
    return this.httpClient.put<BonAchat>(`${this.baseUrl}/${id}`,bonAchat);
  }

  updateBonAchatFromReglementFournisseur( id :number, bonAchat: BonAchat) :Observable<BonAchat>{
    return this.httpClient.put<BonAchat>(`${this.baseUrl+"/regFournisseur"}/${id}`,bonAchat);
  }

  deleteBonAchatById(id :number):Observable<BonAchat>{
   return this.httpClient.delete<BonAchat>(`${this.baseUrl}/${id}`);
  }

  //  Api ligne bon achat

  addListLignBA(list: any): Observable<any> {
    return this.httpClient.post(`${this.lignBAUrl+"/list"}`, list);
  }

  //
  getListBonAchatByFournisseur(fournisseur : Fournisseur):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl+"/fournisseur"}`,fournisseur)
  }
}
