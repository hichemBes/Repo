import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface Niveau {
  id: number;
  code: string;
  libelle: string;
}

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  niveaux: Niveau[] = [
    { id: 1, code: 'Bac', libelle: 'Bac' },
    { id: 2, code: 'Bac', libelle: 'Bac +2' },
    { id: 4, code: 'Licence', libelle: 'Licence' },
    { id: 5, code: 'Bac+4', libelle: 'Bac+5' },
    { id: 6, code: 'Bac+5', libelle: 'Mastére' },
    { id: 7, code: 'Bac+5', libelle: 'Ingénieur' },
    { id: 8, code: 'Bac+7', libelle: 'Docteur' }
  ];
  displayedColumns = ["id", "code","libelle","actions"];
  isEditMode = false;
  currentNiveau!: Niveau;
  niveauForm!: FormGroup;
  dataSource = new MatTableDataSource<Niveau>(this.niveaux);
  dialogRef!: MatDialogRef<any>;

  @ViewChild('niveauDialog') niveauDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.niveauForm = this.fb.group({
      id: [''],
      code: [''],
      libelle: ['']
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openNiveauForm(niveau?: Niveau) {
    this.niveauForm.reset(niveau ? { ...niveau } : { id: null, code: '', libelle: '' });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '550px';
    dialogConfig.height = '400px';
    dialogConfig.data = niveau ? niveau : { id: null, code: '', libelle: '' };

    this.dialogRef = this.dialog.open(this.niveauDialog, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (niveau) {
          const index = this.niveaux.findIndex(n => n.id === niveau.id);
          this.niveaux[index] = result;
        } else {
          result.id = this.niveaux.length ? Math.max(...this.niveaux.map(n => n.id)) + 1 : 1;
          this.niveaux.push(result);
        }
        this.dataSource.data = this.niveaux;
      }
    });
  }

  saveNiveau() {
    if (this.isEditMode) {
      const index = this.niveaux.findIndex(n => n.id === this.currentNiveau.id);
      this.niveaux[index] = this.niveauForm.value;
    } else {
      const newNiveau = this.niveauForm.value;
      newNiveau.id = this.niveaux.length ? Math.max(...this.niveaux.map(n => n.id)) + 1 : 1;
      this.niveaux.push(newNiveau);
    }
    this.dataSource.data = this.niveaux;
    this.dialogRef.close(this.niveauForm.value);
  }

  deleteNiveau(niveau: Niveau) {
    this.niveaux = this.niveaux.filter(n => n.id !== niveau.id);
    this.dataSource.data = this.niveaux;
  }
}
