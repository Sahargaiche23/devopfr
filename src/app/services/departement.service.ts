import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../models/Departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl = 'http://localhost:8089/kaddem/departement'; 

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Récupérer tous les départements
  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.apiUrl}/retrieve-all-departements`);
  }

  // Récupérer un département par ID
  getDepartementById(id: number): Observable<Departement> {
    return this.http.get<Departement>(`${this.apiUrl}/retrieve-departement/${id}`);
  }

  // Ajouter un département
  addDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(`${this.apiUrl}/add-departement`, departement, this.httpOptions);
  }

  // Mettre à jour un département
  updateDepartement(departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(`${this.apiUrl}/update-departement`, departement, this.httpOptions);
  }

  // Supprimer un département
  deleteDepartement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-departement/${id}`);
  }
}
