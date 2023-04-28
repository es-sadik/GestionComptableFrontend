import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/entities/categorie';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private categorieUrl ="http://localhost:8084/api/categories";
  constructor(private httpClient: HttpClient) { }

  

  getAllCategories(): Observable<Categorie[]>{
    return this.httpClient.get<Categorie[]>(`${this.categorieUrl}`);
  }

  addCategorie(categorie: Categorie): Observable<any>{
    console.log(categorie);
    return this.httpClient.post(`${this.categorieUrl}`,categorie);
  }

  getCategorieById( id_cat: number ): Observable<any> {
    return this.httpClient.get<any>(`${this.categorieUrl}/${id_cat}`);
  }

  

  updateCategorie(id_cat: number ,categorie: Categorie):Observable<any>{
    return this.httpClient.put(`${this.categorieUrl}/${id_cat}`,categorie);
  }

  deleteCategorieById( id_cat: number):Observable<Categorie>{
    return this.httpClient.delete<Categorie>(`${this.categorieUrl}/${id_cat}`);
  }
}
