import { Component, OnInit, ViewChild } from '@angular/core';
import {SectionService} from '../service/section.service';
import { Question } from '../Model/Question';
import { Section } from '../Model/Section';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AjouterSectionComponent } from './ajouter-section/ajouter-section.component';
import { UpdateSectionComponent } from './update-section/update-section.component';
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent  implements OnInit {
  Sections !: Section[];
  displayedColumns: string[] = [ 'codeSection', 'libelleSection','actions'];
  dataSource!: MatTableDataSource<Section>;
  showDialog = false;

  SectionForm !: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;
constructor(  public dialog: MatDialog , private  SectionService  :SectionService ,private FormBuilder :FormBuilder ) {
    this.SectionForm = FormBuilder.group({

      idSection:[''],
      codeSection:[''],
      libelleSection:['']
    
    })
}

  ngOnInit(): void {
  
    this.GetallSection();
  }

  GetallSection = () =>{

    return this.SectionService.GetAllSection().subscribe((res)=>{
          this.Sections = res as Section[];
          this.dataSource = new MatTableDataSource<Section>(res as Section[]);
          this.dataSource.paginator = this.paginator;
     })
  }

  openSection(){
    debugger
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false; // Disable closing the dialog by clicking outside of it
     dialogConfig.autoFocus = false; // Focus the first focusable element in the dialog by default
    dialogConfig.width = '550px'; // Set the width of the dialog
    dialogConfig.height =  '650px';
    dialogConfig.data = {
      // Pass data to the dialog component
      exampleData: 'exampleValue'
    };
    const dialogRef = this.dialog.open(AjouterSectionComponent, dialogConfig);
  }
  onSubmit(){

  }
  closeDialog(): void {
    this.showDialog = false;
  }
  toggleDialog(){
    debugger
    this.showDialog = false;
  }

  deleteSection(section :Section){

    console.log(section.idSection)
    this.SectionService.DeleteSection(section.idSection).subscribe((e)=>{
           alert("Suppression réussie");


    })
  }
  editSection = (section :Section)=>{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false; // Disable closing the dialog by clicking outside of it
     dialogConfig.autoFocus = false; // Focus the first focusable element in the dialog by default
    dialogConfig.width = '550px'; // Set the width of the dialog
    dialogConfig.height =  '650px';
    dialogConfig.data = {
      // Pass data to the dialog component
      idSection:section.idSection,
      codeSection:section.codeSection,
      libelleSection:section.libelleSection

    };
    const dialogRef = this.dialog.open(UpdateSectionComponent, dialogConfig);
  }
}
