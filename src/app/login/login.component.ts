import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  form!: FormGroup;
  loading = false;
  submitted = false;
  /**
   *  
   */
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required,Validators.minLength(2)],
      password: ['', Validators.required]
  });
}
get f () { return this.form.controls; }

redirect = ()=>{
debugger
  console.log('redirect');
  debugger
  this.router.navigate(['./ResetPassword']);
}

onSubmit(){
debugger
  console.log("Form Submitted");
  console.table( this.form.value.username);

  let userData = {

    username:this.form.value.username,
    password : this.form.value.password,
    role : this.form.value.username==='hichem'?'admin':'user'
    
  };
  debugger
  if(userData.password&&userData.username){
    const secretKey = 'your_secret_key';

    // Generate the token
    const token = "eeeeeeeeeeeeeefffffffe<vdsvdvkkkkk,mqd";
    
    
      localStorage.setItem('userToken',JSON.stringify(token));
      localStorage.setItem('userData',JSON.stringify(userData));
       this.router.navigate(['/dashboard'],{ relativeTo: this.route});
  }
// Secret key to sign the token

}
  }
  


