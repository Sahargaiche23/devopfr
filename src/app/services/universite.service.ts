import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Universite } from '../models/Universite';
import { Departement } from '../models/Departement';

@Injectable({
  providedIn: 'root',
})
export class UniversiteService {
  private baseUrl = 'http://localhost:8089/kaddem/universite'; // Corrected base URL

  constructor(private http: HttpClient) {}

  // Retrieve the list of all universities
  getUniversites(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.baseUrl}/retrieve-all-universites`);
  }

  // Retrieve a university by its ID
  getUniversite(id: number): Observable<Universite> {
    return this.http.get<Universite>(`${this.baseUrl}/retrieve-universite/${id}`);
  }

  // Add a new university
  addUniversite(universite: Universite): Observable<Universite> {
    return this.http.post<Universite>(`${this.baseUrl}/add-universite`, universite);
  }

  // Update the information of a university
  updateUniversite(universite: Universite): Observable<Universite> {
    return this.http.put<Universite>(`${this.baseUrl}/update-universite`, universite);
  }

  // Remove a university by ID
  deleteUniversite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-universite/${id}`);
  }

  // Assign a university to a department
  affecterUniversiteToDepartement(universiteId: number, departementId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/affecter-universite-departement/${universiteId}/${departementId}`, null);
  }

  // Retrieve list of departments in a university
  getDepartementsByUniversite(id: number): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.baseUrl}/listerDepartementsUniversite/${id}`);
  }
}
