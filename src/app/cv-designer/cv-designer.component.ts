import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cv-designer',
  templateUrl: './cv-designer.component.html',
  styleUrls: ['./cv-designer.component.scss']
})
export class CvDesignerComponent {

  cvForm: FormGroup;
  profileImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.cvForm = this.fb.group({
      personalInfo: this.fb.group({
        name: ['', Validators.required],
        LastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        section: ['', Validators.required],
        address: ['']
      }),
      education: this.fb.array([]),
      experience: this.fb.array([]),
      skills: this.fb.array([])
    });
  }

  get education(): FormArray {
    return this.cvForm.get('education') as FormArray;
  }

  get experience(): FormArray {
    return this.cvForm.get('experience') as FormArray;
  }

  get skills(): FormArray {
    return this.cvForm.get('skills') as FormArray;
  }

  addEducation() {
    this.education.push(this.fb.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
      year: ['', Validators.required]
    }));
  }

  addExperience() {
    this.experience.push(this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['']
    }));
  }

  addSkill() {
    this.skills.push(this.fb.group({
      skill: ['', Validators.required]
    }));
  }

  onSubmit() {
    console.log(this.cvForm.value);
  }


  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result;
        this.cvForm.get('personalInfo.profileImage')?.setValue(this.profileImage);
      };
      reader.readAsDataURL(file);
    }
  }


}
