import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LangueServiceService } from 'src/app/langue-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-langue',
  templateUrl: './update-langue.component.html',
  styleUrls: ['./update-langue.component.scss']
})
export class UpdateLangueComponent {
  
  LangueForm : FormGroup;
  formBuilder: any;

constructor( public dialogRef: MatDialogRef<UpdateLangueComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private LangueService : LangueServiceService) {

  
  this.LangueForm = this.formBuilder.group({
    idLangue : [data.idLangue,Validators.required],
    codeLangue: [data.codeLangue, Validators.required],
    libelleLangue: [data.libelleLangue, Validators.required]
});
}

onCancelClick = ()=>{
  this.dialogRef.close();
}

onSubmit(){
  this.LangueService.updateLangue(this.LangueForm.value,this.LangueForm.value.idLangue).subscribe((res)=>{

    Swal.fire({
      position: 'top-start', // Position the alert at the top left
      icon: 'success',
      title: 'Modifié avec succès',
      showConfirmButton: false, // Remove the confirm button
      timer: 2000 // Auto close after 2 seconds
    });
    

  })
  
}


}