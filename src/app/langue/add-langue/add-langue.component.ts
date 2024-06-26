import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LangueServiceService } from 'src/app/langue-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-langue',
  templateUrl: './add-langue.component.html',
  styleUrls: ['./add-langue.component.scss']
})
export class AddLangueComponent implements OnInit{



  LangueForm : FormGroup;

  /**
   *
   */
  constructor( private formBuilder: FormBuilder ,private langueService : LangueServiceService) {
  
    this.LangueForm = this.formBuilder.group({
      code_langue: ['', Validators.required],
      libelle_langue: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }

  onSubmit(){
    debugger
    let langue = {
      codeLangue: this.LangueForm.value.code_langue,
      libelleLangue: this.LangueForm.value.libelle_langue 
    };

   this.langueService.addLangue(langue).subscribe((res)=>{
    Swal.fire({
      position: 'top-end', // Position the alert at the top left
      icon: 'success',
      title: 'Ajouté avec succès',
      showConfirmButton: false, // Remove the confirm button
      timer: 2000 // Auto close after 2 seconds
    });
    this.ngOnInit();
    
   })

  }
}
