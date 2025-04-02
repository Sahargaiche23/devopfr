import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../../models/Etudiant';
import { EtudiantService } from '../../services/etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  etudiants: Etudiant[] = [];
  selectedEtudiant: Etudiant | null = null;
  newEtudiant: Etudiant = new Etudiant();
  showAddForm: boolean = false; // Add this line

  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.getEtudiants();
  }

  getEtudiants(): void {
    this.etudiantService.getEtudiants()
      .subscribe(etudiants => this.etudiants = etudiants);
  }

  onSelect(etudiant: Etudiant): void {
    this.selectedEtudiant = etudiant;
  }

  addEtudiant(): void {
    this.etudiantService.addEtudiant(this.newEtudiant)
      .subscribe(etudiant => {
        this.etudiants.push(etudiant);
        this.newEtudiant = new Etudiant(); // Clear the form
      });
  }

  updateEtudiant(etudiant: Etudiant): void {
    this.etudiantService.updateEtudiant(etudiant)
      .subscribe(() => {
        // Update the student in the local list if needed
      });
  }

  deleteEtudiant(etudiant: Etudiant): void {
    this.etudiantService.deleteEtudiant(etudiant.idEtudiant)
      .subscribe(() => {
        this.etudiants = this.etudiants.filter(e => e !== etudiant);
        this.selectedEtudiant = null;
      });
  }
  toggleAddForm() { // Add this method
    this.showAddForm = !this.showAddForm;
  }
}
