import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from 'src/app/service/question.service';
import { NotifierService } from 'angular-notifier';
import { SectionService } from 'src/app/service/section.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-ajouter-questions',
  templateUrl: './ajouter-questions.component.html',
  styleUrls: ['./ajouter-questions.component.scss']
})
export class AjouterQuestionsComponent implements OnInit {
  questionForm!: FormGroup;
  private notifier: NotifierService;
  public SectionListe!:any;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AjouterQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService,
    private sectionservice : SectionService,
    notifier: NotifierService
  ) {
    this.createForm();
    this.notifier = notifier;
  }
  private static questions = [
    { id: 1, text: 'Question 1', choices: ['Answer 1', 'Answer 2', 'Answer 3'], correctAnswer: 'Answer 1', point: 10 },
    { id: 2, text: 'Question 2', choices: ['Answer A', 'Answer B', 'Answer C'], correctAnswer: 'Answer B', point: 20 },
    { id: 3, text: 'Question 3', choices: ['Option X', 'Option Y', 'Option Z'], correctAnswer: 'Option Z', point: 30 }
  ];

  static getQuestionsBySession(sessionId: number): Observable<any[]> {
    return of(this.questions);
  }
  static submitAnswers(sessionId: number, answers: any[]): Observable<any> {
    let score = 0;
    answers.forEach(answer => {
      const question = this.questions.find(q => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        score += question.point;
      }
    });
    return of({ score: score });
  }


  ngOnInit(): void {
 

    this.getallsection();
  }
  getallsection (){
    this.sectionservice.GetAllSection().subscribe((result:any)=>{
      this.SectionListe = result;
        console.log(result);
    })
  }

  createForm() {
    this.questionForm = this.formBuilder.group({
   
      question: ['', Validators.required],
      choices: this.formBuilder.array([
        this.formBuilder.control('', Validators.required),
        this.formBuilder.control('', Validators.required)
      ], { validators: this.uniqueChoicesValidator }),
      response: ['', Validators.required], // Ensure response is required
      points: [1, Validators.pattern(/^\d+$/)],
      idSection: [''] // Assuming default value
    });
  }

  uniqueChoicesValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const choicesArray = control.get('choices') as FormArray;
    const choices = choicesArray ? choicesArray.value : [];

    const uniqueChoices = new Set(choices);
    if (choices.length !== uniqueChoices.size) {
      return { duplicateChoices: true };
    }

    return null;
  }

  get choices() {
    return this.questionForm.get('choices') as FormArray;
  }

  addChoice() {
    this.choices.push(this.formBuilder.control('', Validators.required));
  }

  removeChoice(index: number) {
    this.choices.removeAt(index);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addQuestion( ) {
    if (this.questionForm.invalid) {
      this.notifier.show({
        type: 'error',
        message: 'Please fill out all required fields.',
        id: 'form-error'
      });
      return;
    }
  
    // Convert choices from FormArray to array of strings
    const choicesArray = this.questionForm.get('choices')?.value as string[];
    console.log(choicesArray);
  
    // Create a new object with the form data including the choices
    const formData = {
      
      question: this.questionForm.get('question')?.value,
      choix: choicesArray.join(', '),
      response: this.questionForm.get('response')?.value,
      point: this.questionForm.get('points')?.value,
      idSection: this.questionForm.get('idSection')?.value
    };
      console.log("data===>",formData)
    // Send the form data in the request
    this.questionService.AddQuestion(formData,formData.idSection)
                        .subscribe((response) => {
                                console.table(response);
    });
  
    this.dialogRef.close(formData);
  }
  
}
