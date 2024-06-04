import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from 'src/app/service/section.service';


@Component({
  selector: 'app-ajouter-section',
  templateUrl: './ajouter-section.component.html',
  styleUrls: ['./ajouter-section.component.scss']
})
export class AjouterSectionComponent {

  sectionForm!: FormGroup;

constructor(  private formBuilder: FormBuilder ,   public SectionService :SectionService,  ) {
  this.sectionForm = this.formBuilder.group({
    codeSection: ['', Validators.required],
    libelleSection: ['', Validators.required]
  });

}

onSubmit(): void {
  if (this.sectionForm.valid) {
    const formData = this.sectionForm.value;
    // Here you can perform actions like sending the form data to a backend API
    console.log('Form submitted with data:', formData);
        this.SectionService.AddSecction(this.sectionForm.value).subscribe((e)=>{
          console.log('Form')
        })
    this.sectionForm.reset();
  }
}


}
