import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";


import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from '@angular/material/table';
import { SessionComponent } from "./session.component";
import { SessionService } from "../services/session.service";
import { SessionDetailsComponent } from './session-details/session-details.component';
import { AddSessionComponent } from './add-session/add-session.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Session",
      urls: [{ title: "Session", url: "/session" }, { title: "Session" }],
    },
    component: SessionComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatTableModule ,
    NgMultiSelectDropDownModule.forRoot()

  ],
  declarations: [
  
    
  
    SessionDetailsComponent,
                 AddSessionComponent
  ],

  providers: [SessionService],
})
export class SessionModule {}
