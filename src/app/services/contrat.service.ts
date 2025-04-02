import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contrat} from "../models/Contrat";

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private baseUrl = 'http://localhost:8089/kaddem/contrat'; // Update the base URL

  constructor(private http: HttpClient) {}

  // Retrieve the list of all universities
  getContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.baseUrl}/retrieve-all-contrats`);
  }

  // Retrieve a university by its ID
  getContrat(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.baseUrl}/retrieve-contrat/${id}`);
  }

  // Add a new university
  addContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.baseUrl}/add-contrat`, contrat);
  }

  // Update the information of a university
  updateContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.baseUrl}/update-contrat`, contrat);
  }

}
