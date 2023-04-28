import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReglementFournisseur } from 'src/app/entities/reglement-fournisseur';

@Injectable({
  providedIn: 'root'
})
export class ReglementFournisseurService {

  private baseUrl ="http://localhost:8084/api/reglementFournisseurs";
  
 
  constructor(private httpClient: HttpClient) { }
  
 

  addReglementFournisseur( reglementFournisseur : ReglementFournisseur ):Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`,reglementFournisseur)
  }

  addListReglementFournisseur( listReglementFournisseur : ReglementFournisseur[] ):Observable<any> {
    return this.httpClient.post(`${this.baseUrl+"/addList"}`,listReglementFournisseur)
  }

  getNextCodeRF( date : Date):Observable<any> {
    return this.httpClient.post(`${this.baseUrl+"/next"}`, date,{responseType: 'text'});
  }

  getAllReglementFournisseur():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`)
  }

  deleteReglementFournisseurById(id : number):Observable<ReglementFournisseur>{
    return this.httpClient.delete<ReglementFournisseur>(`${this.baseUrl}/${id}`)
  }
  
  

 
}
