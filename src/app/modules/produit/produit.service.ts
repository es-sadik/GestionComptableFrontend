import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/entities/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl ="http://localhost:8084/api/produits";
  private imageUrl ="http://localhost:8084/api/imageproduit";
  
 
  constructor(private httpClient: HttpClient) { }
  
  getAllProduits():Observable<Produit[]>{
    return this.httpClient.get<Produit[]>(`${this.baseUrl}`)
  }


  selectProduitsOrderByCategorie():Observable<Produit[]>{
    return this.httpClient.get<Produit[]>(`${this.baseUrl}/OrderBy`)
  }

  getProduitByRef( reference :string ):Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${reference}`)
  }

  addProduit(produit:Produit):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}`,produit);
  }

  updateProduit(reference :string ,produit:Produit):Observable<Produit>{
    return this.httpClient.put<Produit>(`${this.baseUrl}/${reference}`,produit);
  }

  deleteProduitByRef( reference :string):Observable<Produit>{
    return this.httpClient.delete<Produit>(`${this.baseUrl}/${reference}`)
  }

  getImageById():Observable<string>{
    return this.httpClient.get(`${this.imageUrl}`,{responseType: 'text'});
  }

  putImage(file: any):Observable<any>{
    return this.httpClient.put(`${this.imageUrl}`,file);
  }

  

}
