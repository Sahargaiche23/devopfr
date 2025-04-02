import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/Etudiant'; 

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private baseUrl = 'http://localhost:8089/kaddem/etudiant'; // Corrigé avec le chemin complet incluant '/kaddem'

  constructor(private http: HttpClient) { }

  // Récupère la liste de tous les étudiants
  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.baseUrl}/retrieve-all-etudiants`);
  }

  // Récupère un étudiant par son identifiant
  getEtudiant(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.baseUrl}/retrieve-etudiant/${id}`);
  }

  // Ajoute un nouvel étudiant
  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    const headers = { 'Content-Type': 'application/json' }; // Ensure correct content type

    return this.http.post<Etudiant>(`${this.baseUrl}/add-etudiant`, etudiant);
  }

  // Met à jour les informations d'un étudiant
  updateEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.baseUrl}/update-etudiant`, etudiant);
  }

  // Supprime un étudiant par son identifiant
  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-etudiant/${id}`);  // Correction ici du chemin
  }
}
