import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { QuestionsComponent } from "./questions.component";
import { AjouterQuestionsComponent } from './ajouter-questions/ajouter-questions.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";
import { UpdateQuestionComponent } from './update-question/update-question.component';
import { QuestionService } from "../service/question.service";
import { HttpClientModule } from "@angular/common/http";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SectionService } from "../service/section.service";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Question",
      urls: [{ title: "About", url: "/about" }, { title: "About" }],
    },
    component: QuestionsComponent,
  },
];
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NotifierModule.withConfig(customNotifierOptions),
    MatDialogModule,
   
    MatPaginatorModule,
        MatTableModule ,
        MatIconModule,
      ],
      declarations: [

    AjouterQuestionsComponent,
        UpdateQuestionComponent
  ],
})
export class questionModule {}
