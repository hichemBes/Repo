import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ApplySeesionComponent } from './apply-seesion/apply-seesion.component';
import { LangueComponent } from './langue/langue.component';
import { EducationComponent } from './education/education.component';


export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
     
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path:'question',
        loadChildren:()=>
          import('./questions/question.module').then(m =>m.questionModule )
        
  
      } ,
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
      
    ,{
       path:'session',
       loadChildren:()=>import('./session/session.module').then(m=>m.SessionModule)

    } 
    ,{
      path:'Section',
      loadChildren:()=>import('./section/section.module').then(m=>m.SectionModule)
   } 
   ,{
    path:'cv',
    loadChildren:()=>import('./cv-designer/cv-designer.module').then(m=>m.Cvmodule)
 } ,



 {
path:'Langue',
component:LangueComponent
 }
 ,
 {

  
    path:'etude',
    component:EducationComponent
  
 }
,{
  path:'apply/:id',
  component:ApplySeesionComponent
 },
   

    ]
  },
  {
    
    path: 'Login',
    component:LoginComponent
  
},
{
    
  path: 'ResetPassword',
  component:ResetPasswordComponent

},
{

  
  path:'register',
  component:RegisterComponent
},

,
{
 path:'apply/:id',
 component:ApplySeesionComponent
},
  {
    path: '**',
    redirectTo: '/starter'
  },
 
];
