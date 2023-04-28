import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/entities/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl ="http://localhost:8084/api/clients";
  private imageUrl ="http://localhost:8084/api/imageclient";

  constructor(private httpClient: HttpClient) {}
 
  getClientList(): Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.baseUrl}`);
  }

  getClientById(id :number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }

  addClient(client: Client): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, client);
  }
  
  updateClient( id :number, client: Client) :Observable<Client>{
    return this.httpClient.put<Client>(`${this.baseUrl}/${id}`,client);
  }

  deleteClientById(id :number):Observable<Client>{
   return this.httpClient.delete<Client>(`${this.baseUrl}/${id}`);
  }


  getImage():Observable<string>{
    return this.httpClient.get(`${this.imageUrl}`,{responseType: 'text'});
  }

  putImage(file: any):Observable<any>{
    return this.httpClient.put(`${this.imageUrl}`,file);
  }

  
}
