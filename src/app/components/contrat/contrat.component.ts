import { Component } from '@angular/core';
import {Universite} from "../../models/Universite";
import {UniversiteService} from "../../services/universite.service";
import {Contrat} from "../../models/Contrat";
import {ContratService} from "../../services/contrat.service";

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent {
  contrats: Contrat[] = [];
  selectedContrat: Contrat | null = null;
  newContrat: Contrat = new Contrat();
  showAddForm: boolean = false;

  constructor(private contratService: ContratService) { }

  ngOnInit(): void {
    this.getContrats();
  }

  getContrats(): void {
    this.contratService.getContrats()
      .subscribe(contrats => this.contrats = contrats);
  }

  onSelect(contrat: Contrat): void {
    this.selectedContrat = contrat;
  }

  addContrat(): void {
    this.contratService.addContrat(this.newContrat)
      .subscribe(contart => {
        this.contrats.push(contart);
        this.newContrat = new Contrat(); // Clear the form
      });
  }

  updateContrat(contrat: Contrat): void {
    this.contratService.updateContrat(contrat)
      .subscribe(() => {
        // Update the university in the local list if needed
      });
  }



  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
}
