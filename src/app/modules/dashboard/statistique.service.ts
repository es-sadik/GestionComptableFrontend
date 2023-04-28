import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  private baseUrl ="http://localhost:8084/api/statistiques";

  constructor(private httpClient: HttpClient) {}
  
  getNumbersOfAll(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl+"/getNumbersOfAll"}`);
  }

  getDataBarChart(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl+"/dataBarChart"}`,{responseType: 'text'});
  }

  getDataLineChart(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl+"/dataLineChart"}`,{responseType: 'text'});
  }

  getDataPieChart(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl+"/dataPieChart"}`,{responseType: 'text'});
  }

  getDataDoughnutChart(): Observable<any>{
    return this.httpClient.get(`${this.baseUrl+"/dataDoughnutChart"}`,{responseType: 'text'});
  }
}
