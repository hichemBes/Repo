import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.scss']
})
export class UpdateSectionComponent {



  constructor (  public dialogRef: MatDialogRef<UpdateSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {

    
  }


  onCancelClick = ()=>{
    this.dialogRef.close();
  }

  Update=()=>{

    console.log("====>")


  }
}
