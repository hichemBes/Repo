import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   
  form!: FormGroup;
 
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
       FirstName: ['', [Validators.required, Validators.minLength(2)]],
       lastName: ['', [Validators.required, Validators.minLength(2)]],
       Email: ['', [Validators.email]],
       Password: ['', Validators.required]
    });
  } 
  
  Register = () => {
    debugger
    console.log(this.form.controls['FirstName'].value);
    console.log(this.form.controls['lastName'].value);
  }
  
  redirect(){

    debugger
  }
}
