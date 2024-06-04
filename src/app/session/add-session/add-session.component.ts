import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Section } from 'src/app/Model/Section';
import { Question } from 'src/app/Model/Question';
import { QuestionService } from 'src/app/service/question.service';
import { SectionService } from 'src/app/service/section.service';
import { SessionService } from 'src/app/services/session.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent {

  placeholderSingleSelection: string = 'Choisir Question ';
  placeholderMultipleSelection: string = 'Choisir questions';
  closeDropDownOnSelection:boolean=true;
  maxHeight:string
  SessionForm: FormGroup;
  ListQuestion: any[];
  ListeSection: Section[];
  dropdownSettings:IDropdownSettings={};
  QuestionScore :number = 0 ; 
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddSessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public QuestionService: QuestionService,
    private SessionService: SessionService,
    private SectionService: SectionService
  ) {
    this.createFormGroup();
    this.getALLSection();
    this.allQuestion();
    this.dropdownSettings = {
      idField: 'idQuestion',
      textField: 'question',
    };
  }

  getALLSection() {
    this.SectionService.GetAllSection().subscribe((res) => {
      this.ListeSection = res as Section[];
    });
  }

  allQuestion(Section?: string) {
    debugger
    this.QuestionService.getAllQuestion().subscribe((res) => {
      this.ListQuestion = res ;
      if (Section) {
        this.ListQuestion = this.ListQuestion.filter(
          (w) => w.text.trim().toUpperCase() === Section.trim().toUpperCase()
        );
      }
      console.log(res);
      console.log("=====>");
      console.log(this.ListQuestion);
      console.log("<=====");
    });
  }

isQuestionSelected(question: any): boolean {
  const selectedQuestions = this.SessionForm.get('selectedQuestions') as FormArray;
  return selectedQuestions.value.some((selectedQuestion: any) => selectedQuestion.idQuestion === question.idQuestion);
}

onDeSelectAll(){
debugger

}
onClear($event){
  debugger
}
  onItemSelect($event) {
    if (!this.isQuestionSelected($event)) {
      const selectedQuestions = this.SessionForm.get('selectedQuestions') as FormArray;
      selectedQuestions.push(this.fb.control($event));
      this.calculateTotalScore(); // Recalculate total score after adding a question
    }
  }
  onSelectAll($event) {
    const selectedQuestions = this.SessionForm.get('selectedQuestions') as FormArray;
    $event.forEach(item => {
      if (!this.isQuestionSelected(item)) {
        selectedQuestions.push(this.fb.control(item));
      }
    });
    this.calculateTotalScore(); // Recalculate total score after adding questions
  }

  onItemDeSelect($event){
    debugger
    const selectedQuestions = this.SessionForm.get('selectedQuestions') as FormArray;
      selectedQuestions.controls.filter((control) => {
    if (control.value.idQuestion === $event.idQuestion) {
      selectedQuestions.removeAt(selectedQuestions.controls.indexOf(control));
    }
  });

  }
  createFormGroup() {
    this.SessionForm = this.fb.group({
      libelle_session:['',Validators.required],
      StartDate :  ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      SectionId: ['', [Validators.required]],
      selectedQuestions: this.fb.array([], Validators.required),
      criteria: this.fb.group({
        educationLevel: ['']
      }),
      nombre_condiats:['',Validators.min(1)],
      selectedCandidates: this.fb.array([], Validators.required)
    });
    const selectedQuestionsFormArray =  this.SessionForm.get('selectedQuestions') as FormArray;
    selectedQuestionsFormArray.valueChanges.subscribe(() => {
      this.calculateTotalScore();
    });

    // Subscribe to SectionId changes
    this.SessionForm.get('SectionId').valueChanges.subscribe(sectionId => {
      this.onSectionChange(sectionId);
    });
    
  }
  // onSelect(event: any) {
  //   this.SessionForm.patchValue({ selectedQuestions: event });
  // }
  filterCandidates() {
    // Your logic for filtering candidates
  }

  addSession() {

    const sessionData = {
      startDate: this.SessionForm.get('StartDate').value as Date,
      endDate: this.SessionForm.get('EndDate').value as Date,
      SectionId: this.SessionForm.get('SectionId').value,
      criteria: this.SessionForm.get('criteria').value,
      selectedCandidates: this.SessionForm.get('selectedCandidates').value,
      libelleSession:this.SessionForm.get('libelle_session').value,
      nbrCandidats : this.SessionForm.get('nombre_condiats').value
    };
    const selectedQuestions = (this.SessionForm.get('selectedQuestions') as FormArray).value.map(question => question.idQuestion);
    const selectedCandidates = this.SessionForm.get('selectedCandidates').value.map(candidate => candidate.id);

    this.SessionService.addSession(sessionData, selectedQuestions, selectedCandidates).subscribe(
      (response) => {
        console.log('Session added successfully', response);
        this.dialogRef.close();
  
    },
      
    );


  }

  closeDialog() {
    this.dialogRef.close();
  }

  get questions(): FormArray {
    return this.SessionForm.get('questions') as FormArray;
  }

  updateNombreQuestions() {
    this.SessionForm.get('nombre_question').setValue(this.questions.length);
  }

  close() {
    this.dialogRef.close();
  }

  addQuestion() {
    this.questions.push(this.fb.control('', Validators.required));
    this.updateNombreQuestions();
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
    this.updateNombreQuestions();
  }

  onSectionChange(sectionId: any) {
    this.allQuestion(sectionId);
  }




  calculateTotalScore() {
    this.QuestionScore = 0; // Initialize total score to zero
    let questions = this.SessionForm.get('selectedQuestions') as FormArray;
    questions.value.forEach(element => {
      this.QuestionScore += element.point;
    });
  }

}
