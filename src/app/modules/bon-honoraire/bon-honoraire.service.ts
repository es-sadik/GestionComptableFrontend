import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BonHonoraire } from 'src/app/entities/bon-honoraire';
import { Client } from 'src/app/entities/client';

@Injectable({
  providedIn: 'root'
})
export class BonHonoraireService {

  private baseUrl ="http://localhost:8084/api/bonHonoraire";
  private lignBHUrl ="http://localhost:8084/api/lignBH";


  constructor(private httpClient: HttpClient) {}

  getNextBonHNum(date: Date):Observable<any>{
    return this.httpClient.post(`${this.baseUrl+"/next"}`, date,{responseType: 'text'});
  }
  getCurrentBonHNum(id:number ,date: Date):Observable<any>{
    return this.httpClient.post(`${this.baseUrl+"/current"}/${id}`, date,{responseType: 'text'});
  }
  getBonHonoraireList(): Observable<BonHonoraire[]>{
    return this.httpClient.get<BonHonoraire[]>(`${this.baseUrl}`);
  }

  getBonHonoraireById(id :number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }

  addBonHonoraire(bonHonoraire: BonHonoraire): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, bonHonoraire);
  }
  
  updateBonHonoraire( id :number, bonHonoraire: BonHonoraire) :Observable<BonHonoraire>{
    return this.httpClient.put<BonHonoraire>(`${this.baseUrl}/${id}`,bonHonoraire);
  }

  updateBonHonoraireFromReglementClient( id :number, bonHonoraire: BonHonoraire) :Observable<BonHonoraire>{
    return this.httpClient.put<BonHonoraire>(`${this.baseUrl+"/regClient"}/${id}`,bonHonoraire);
  }

  deleteBonHonoraireById(id :number):Observable<BonHonoraire>{
   return this.httpClient.delete<BonHonoraire>(`${this.baseUrl}/${id}`);
  }

  //  Api ligne bon honoraire :

  addListLignBA(list: any): Observable<any> {
    return this.httpClient.post(`${this.lignBHUrl+"/list"}`, list);
  }

  //
  getListBonHonoraireByClient(client : Client):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl+"/client"}`,client)
  }
}
