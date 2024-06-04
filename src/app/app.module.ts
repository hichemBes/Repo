import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';



import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SessionComponent } from './session/session.component';
import { QuestionsComponent } from './questions/questions.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { QuestionService } from './service/question.service';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SectionComponent } from './section/section.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SessionService } from './services/session.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CvDesignerComponent } from './cv-designer/cv-designer.component';
import { ApplySeesionComponent } from './apply-seesion/apply-seesion.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    SessionComponent,
    QuestionsComponent,
    SectionComponent,
    ResetPasswordComponent,
    CvDesignerComponent,
    ApplySeesionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false}),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    MatDialogModule,
    MatTableModule ,
    MatIconModule,
    NotifierModule,
    MatPaginatorModule,
    MatIconModule,
   NgMultiSelectDropDownModule.forRoot(),
    MatFormFieldModule,
    SlickCarouselModule,
    SlickCarouselModule


    
  ],
  providers: [
    {
      
      
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
     
    },
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
