import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DossierCondidatServiceService } from '../dossier-condidat-service.service';

@Component({
  selector: 'app-cv-designer',
  templateUrl: './cv-designer.component.html',
  styleUrls: ['./cv-designer.component.scss']
})
export class CvDesignerComponent {

  cvForm: FormGroup;
  profileImage: string | ArrayBuffer | null = null;

  genres = ['MEN', 'WOMEN'];
  etatCiviles = ['CELIBATAIRE', 'MARIE'];
  niveaux = ['BAC', 'LICENCE', 'MASTER', 'DOCTORAT'];

  constructor(private fb: FormBuilder, private dossierCondidatService: DossierCondidatServiceService) {
    this.cvForm = this.fb.group({
      personalInfo: this.fb.group({
        name: ['', Validators.required],
        LastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        genre: [[], Validators.required], // Allow multiple values
        etatCivile: ['', Validators.required],
        niveau: [[], Validators.required], // Allow multiple values
        dateNaissance: ['', Validators.required],
        numCin: ['', Validators.required],
        numTel: ['', Validators.required],
        nbrAnnesExp: ['', Validators.required],
        scoreDossier: ['', Validators.required],
        address: ['', Validators.required],
      }),
      address: this.fb.group({
        codePostal: ['', Validators.required],
        ville: ['', Validators.required],
        gouvernorat: ['', Validators.required]
      }),
      loisirs: this.fb.array([]),
      competences: this.fb.array([]),
      certificatProfissionals: this.fb.array([]),
      diplomes: this.fb.array([])
    });
  }

  get loisirs(): FormArray {
    return this.cvForm.get('loisirs') as FormArray;
  }

  get competences(): FormArray {
    return this.cvForm.get('competences') as FormArray;
  }

  get certificatProfissionals(): FormArray {
    return this.cvForm.get('certificatProfissionals') as FormArray;
  }

  get diplomes(): FormArray {
    return this.cvForm.get('diplomes') as FormArray;
  }

  addLoisir() {
    this.loisirs.push(this.fb.group({
      libelleLoisir: ['', Validators.required]
    }));
  }

  addCompetence() {
    this.competences.push(this.fb.group({
      libelleCompetence: ['', Validators.required]
    }));
  }

  addCertificat() {
    this.certificatProfissionals.push(this.fb.group({
      libelleCertificatProfissional: ['', Validators.required]
    }));
  }

  addDiplome() {
    this.diplomes.push(this.fb.group({
      libelleDiplome: ['', Validators.required],
      mention: ['', Validators.required],
      anneDiplome: ['', Validators.required]
    }));
  }



  onSubmit() {

      const formValue = this.cvForm.value;
  
      // Vérification des champs vides et ajout de valeurs par défaut si nécessaire
      const dossierCondidat = {
        dateNaissance: formValue.personalInfo.dateNaissance,
        numCin: formValue.personalInfo.numCin,
        numTel: formValue.personalInfo.numTel || 'N/A',
        nbrAnnesExp: formValue.personalInfo.nbrAnnesExp || '0',
        scoreDossier: formValue.personalInfo.scoreDossier || '0',
        genre: formValue.personalInfo.genre.join(','),
        etatCivile: formValue.personalInfo.etatCivile,
        niveau: formValue.personalInfo.niveau.join(','),
        active: true,
        adress: {
          codePostal: formValue.address.codePostal || 'N/A',
          ville: formValue.address.ville || 'N/A',
          gouvernorat: formValue.address.gouvernorat || 'N/A',
        },
        loisirs: formValue.loisirs.length ? formValue.loisirs : [{ libelleLoisir: 'N/A' }],
        competences: formValue.competences.length ? formValue.competences : [{ libelleCompetence: 'N/A' }],
        certificatProfissionals: formValue.certificatProfissionals.length ? formValue.certificatProfissionals : [{ libelleCertificatProfissional: 'N/A' }],
        diplomes: formValue.diplomes.length ? formValue.diplomes : [{ libelleDiplome: 'N/A', mention: 'N/A', anneDiplome: 'N/A' }],
      };
  
      const email = formValue.personalInfo.email;
      const langueIds = [1];
  
      this.dossierCondidatService.saveDossierCondidat(dossierCondidat, email, langueIds).subscribe(
        response => {
          console.log('Dossier Condidat saved successfully', response);
        },
        error => {
          console.error('Error saving Dossier Condidat', error);
        }
      );
    
  }
  



  onImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
