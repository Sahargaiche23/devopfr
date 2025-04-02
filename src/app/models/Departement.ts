import { Etudiant } from './Etudiant'; 

export class Departement {
  idDepartement!: number;
  nomDepart!: string;
  etudiants!: Etudiant[]; 
}
