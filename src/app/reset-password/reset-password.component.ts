import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

 form !:FormGroup
  
  constructor(private fb :  FormBuilder ) {

  
    
  }

  onSubmit(){

    
  }

  
}
