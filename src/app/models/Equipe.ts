import { Etudiant } from './Etudiant'; 
import { DetailEquipe } from './DetailEquipe';

export class Equipe {
  idEquipe!: number;
  nomEquipe!: string;
  niveau!: string;
  etudiants!: Etudiant[]; 
  detailEquipe!: DetailEquipe; 
}
