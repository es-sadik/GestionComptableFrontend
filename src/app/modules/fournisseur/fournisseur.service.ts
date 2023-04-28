import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from 'src/app/entities/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private baseUrl ="http://localhost:8084/api/fournisseurs";
  private imageUrl ="http://localhost:8084/api/imagefournisseur";

  constructor(private httpClient: HttpClient) {}
  
  getAllFournisseurs(): Observable<Fournisseur[]>{
    return this.httpClient.get<Fournisseur[]>(`${this.baseUrl}`);
  }

  getFournisseurById(id : number) :Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`)
  }

  addFournisseur(fournisseur : Fournisseur):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`, fournisseur);

  }

  updateFournisseur(id :number ,fournisseur :Fournisseur):Observable<Fournisseur>{
    return this.httpClient.put<Fournisseur>(`${this.baseUrl}/${id}`,fournisseur);

  }

  deleteFournisseurById(id :number):Observable<Fournisseur>{
    return this.httpClient.delete<Fournisseur>(`${this.baseUrl}/${id}`);
  }
  getImage():Observable<string>{
    return this.httpClient.get(`${this.imageUrl}`,{responseType: 'text'});
  }

  putImage(file: any):Observable<any>{
    return this.httpClient.put(`${this.imageUrl}`,file);
  }
  
}
