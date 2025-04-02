
  import { Option } from './Option'; 
  
import { Contrat } from './Contrat';  // Importer le modèle Contrat

export class Etudiant {
  idEtudiant!: number;
  prenomE!: string;
  nomE!: string;
  op!: Option;
  contrats!: Contrat[];  
}
