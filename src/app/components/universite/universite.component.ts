import { Component, OnInit } from '@angular/core';
import { Universite } from '../../models/Universite';
import { UniversiteService } from '../../services/universite.service';

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent implements OnInit {
  universites: Universite[] = [];
  selectedUniversite: Universite | null = null;
  newUniversite: Universite = new Universite();
  showAddForm: boolean = false;

  constructor(private universiteService: UniversiteService) { }

  ngOnInit(): void {
    this.getUniversites();
  }

  getUniversites(): void {
    this.universiteService.getUniversites()
      .subscribe(universites => this.universites = universites);
  }

  onSelect(universite: Universite): void {
    this.selectedUniversite = universite;
  }

  addUniversite(): void {
    this.universiteService.addUniversite(this.newUniversite)
      .subscribe(universite => {
        this.universites.push(universite);
        this.newUniversite = new Universite(); // Clear the form
      });
  }

  updateUniversite(universite: Universite): void {
    this.universiteService.updateUniversite(universite)
      .subscribe(() => {
        // Update the university in the local list if needed
      });
  }

  

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
}
