import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReglementClient } from 'src/app/entities/reglement-client';

@Injectable({
  providedIn: 'root'
})
export class ReglementClientService {

 
  private baseUrl ="http://localhost:8084/api/reglementClients";
  
 
  constructor(private httpClient: HttpClient) { }
  
 

  addReglementClient( reglementClient : ReglementClient ):Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`,reglementClient)
  }

  addListReglementClient( listReglementClient : ReglementClient[] ):Observable<any> {
    return this.httpClient.post(`${this.baseUrl+"/addList"}`,listReglementClient)
  }

  getNextCodeRF( date : Date):Observable<any> {
    return this.httpClient.post(`${this.baseUrl+"/next"}`, date,{responseType: 'text'});
  }

  getAllReglementClient():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`)
  }

  deleteReglementClientById(id : number):Observable<ReglementClient>{
    return this.httpClient.delete<ReglementClient>(`${this.baseUrl}/${id}`)
  }
  
  

}
