import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit{
  questionForm!: FormGroup;

  constructor( private formBuilder: FormBuilder ,public dialogRef: MatDialogRef<UpdateQuestionComponent>,  
      @Inject(MAT_DIALOG_DATA) public data: any,private questionService : QuestionService ) {
        console.log(  "Choices==>", this.data.choices);
        console.log(  "data==>", this.data);
        this.createForm();
      
    }
    
    createForm() {
      this.questionForm = this.formBuilder.group({
        question: [this.data.question, Validators.required],
        choices: this.formBuilder.array(
          this.data?.choix.split(',') 
    ? this.data?.choix.split(',').map((c: any) => this.formBuilder.control(c, Validators.required)) 
    : []
        ),
         points:[1,Validators.pattern(/^\d+$/)],
        Response: ['', Validators.required]
      });
    }
    
    ngOnInit(): void {

          console.log("======>");
          console.log(this.data);
          console.log(this.questionForm);
          console.log(this.questionForm.value );
          
          console.log("======>");
      
  }


  closeDialog(){
    this.dialogRef.close();

  }
  get choices() {
    return this.questionForm.get('choices') as FormArray;
  }
  addChoice() {
    this.choices.push(this.formBuilder.control('', Validators.required));
  }
  removeChoice(index: number) {
    this.choices.removeAt(index);
    if (this.questionForm.controls['Response'].value === this.choices.at(index).value) {
      this.questionForm.patchValue({ Response: '' }); // Reset correct answer if removed
    }
  }

  updateQuestion(){

    debugger
    const choicesArray = this.questionForm.get('choices')?.value as string[];
    console.log(choicesArray);


// Create a new object with the form data including the choices
    const formData = {
      idQuestion :this.data.idQuestion,
      question: this.questionForm.get('question')?.value,
      choix: choicesArray.join(','),
      response: this.questionForm.get('Response')?.value,
      point: this.questionForm.get('points')?.value,
      // id_section: 1,
      idSection:this.questionForm.get('idSection')?.value,
    };
    console.log(formData);
    this.questionService.UpdateQuestion(this.data.idQuestion,formData).subscribe((res)=>{

      console.log(res);
      this.dialogRef.close(res);
    })
  }

  };

 

