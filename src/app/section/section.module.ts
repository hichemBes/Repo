import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";

import { QuestionService } from "../service/question.service";
import { HttpClientModule } from "@angular/common/http";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { SectionService } from "../service/section.service";
import { SectionComponent } from "./section.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AjouterSectionComponent } from './ajouter-section/ajouter-section.component';
import { UpdateSectionComponent } from './update-section/update-section.component';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Section",
      urls: [{ title: "About", url: "/Section" }, { title: "Section" }],
    },
    component: SectionComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),

    MatDialogModule,
  
    MatPaginatorModule,
        MatTableModule ,
        MatIconModule,
        MatIconModule,
        MatFormFieldModule 
      ],
      declarations: [

  
    AjouterSectionComponent,
          UpdateSectionComponent
  ],
})
export class SectionModule {}



