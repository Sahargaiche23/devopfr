import { Etudiant } from './Etudiant';

export class Contrat {
  idContrat!: number;
  dateDebutContrat!: Date;
  dateFinContrat!: Date;
  specialite!: string;
  archive!: boolean;
  montantContrat!: number;
  etudiant!: Etudiant;  // L'étudiant associé au contrat
}
