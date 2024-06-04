import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AjouterQuestionsComponent } from './ajouter-questions/ajouter-questions.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UpdateQuestionComponent as  update} from './update-question/update-question.component';
import { auto } from '@popperjs/core';
import { Observable, of } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { Question } from '../Model/Question';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit ,AfterViewInit{
  totalItems: number = 100; // Total number of items
  pageSize: number = 10; // Number of items per page
  pageSizeOptions: number[] = [5, 10, 25, 100]; // Options for page size
  currentPageData: any[] = [];
  /**
   *
   */

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dialogRef :MatDialogRef<AjouterQuestionsComponent, any> | undefined;
  /**
   *
   */
  public questions :Question[]=[] ;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] | undefined 
  constructor(public dialog: MatDialog,private  QuestionService : QuestionService) {
    this.displayedColumns  = [ 'text','Reponse','choix',  'dateCreation','point' , 'actions'];
     
}
  ngAfterViewInit(): void {
        console.log(this.questions);
   
  }
  ngOnInit(): void {
this.QuestionService.getAllQuestion().subscribe((res)=>{
  this.questions = res
  this.currentPageData = this.questions.slice(0,this.pageSize);
  this.dataSource=new MatTableDataSource<any>(this.questions);
  
}
)

};
deleteQuestion(question:any){
  debugger
  Swal.fire({
    title: 'Supprimer Question',
    text: 'Vous êtes sûr de supprimer ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui, Supprimer!',
    cancelButtonText: 'Annulé!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.QuestionService.deleteQuestion(question.idQuestion).subscribe((response:any) => {
        console.log(response);
        this.ngOnInit(); // Refresh the component data
        Swal.fire(
          'Supprimer',
          'Supprimer avec succès!',
          'success'
        );
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Annuler',
        'Annuler avec succès!',
        'error'
      );
    }
  });
}
editQuestion=(question :Question)=>{
  
  console.log(question);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data=question;
 
  dialogConfig.disableClose = false; 
   dialogConfig.autoFocus = false; 
  dialogConfig.width = '450px'; 
  dialogConfig.height =  '650px';
  const dialogRef = this.dialog.open(update, dialogConfig);
  
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
   this.ngOnInit();
   });
}

  
  openNumberModal(): void {
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
    const dialogRef = this.dialog.open(AjouterQuestionsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
     this.ngOnInit();
     });
}
onPageChange(event: PageEvent) {
  debugger
  console.log(event)
  this.totalItems = this.questions.length;
  const startIndex = event.pageIndex * event.pageSize;
  const endIndex = startIndex + event.pageSize;
  this.currentPageData = this.questions.slice(startIndex, endIndex);
}

}
