import { Component, OnInit } from '@angular/core';
import { Departement } from 'src/app/models/Departement';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {
  departements: Departement[] = [];
  selectedDepartement: Departement | null = null;
  newDepartement: Departement = new Departement();
  showAddForm: boolean = false;

  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
    this.getDepartements();
  }

  getDepartements(): void {
    this.departementService.getDepartements().subscribe((departements: Departement[]) => {
      this.departements = departements;
    });
  }

  getDepartementById(id: number): void {
    this.departementService.getDepartementById(id).subscribe((departement: Departement) => {
      this.selectedDepartement = departement;
    });
  }

  addDepartement(): void {
    this.departementService.addDepartement(this.newDepartement).subscribe((departement: Departement) => {
      this.departements.push(departement);
      this.showAddForm = false; // Close the form
      this.newDepartement = new Departement(); // Reset the new departement object
    });
  }

  updateDepartement(departement: Departement): void {
    this.departementService.updateDepartement(departement).subscribe((updatedDepartement: Departement) => {
      const index = this.departements.findIndex(d => d.idDepartement === updatedDepartement.idDepartement);
      if (index !== -1) {
        this.departements[index] = updatedDepartement;
      }
      this.selectedDepartement = null; // Close the edit form
    });
  }

  deleteDepartement(id: number): void {
    this.departementService.deleteDepartement(id).subscribe(() => {
      this.departements = this.departements.filter(departement => departement.idDepartement !== id);
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

}
