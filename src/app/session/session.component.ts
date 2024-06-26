import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Session } from '../Model/Session';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddSessionComponent } from './add-session/add-session.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  SessionList !:any[]
  
  constructor(   public router :Router , public dialog: MatDialog ,  private sessionservice :SessionService) {
  }
  
  ngOnInit(): void {
    
    debugger
    this.getallSession();
  }
  getallSession = ()=>{
    this.sessionservice.getAllsession().subscribe((res:any)=>{
      debugger
      console.log(res);
      this.SessionList = res;
    })
  }
  seeMore=(item :any)=>{


  }

  participer(item){

     console.log(item); 
    console.log(item.idSession); 
    let id = item.idSession;
    this.router.navigate([`/apply/${id}`]);
  }


  openNumberModal=()=>{
    debugger
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false; // Disable closing the dialog by clicking outside of it
     dialogConfig.autoFocus = false; // Focus the first focusable element in the dialog by default
    dialogConfig.width = '600px'; // Set the width of the dialog
    dialogConfig.height =  '700px';
    dialogConfig.closeOnNavigation = true 
    dialogConfig.data = {
      // Pass data to the dialog component
      exampleData: 'exampleValue'
    };
    const dialogRef = this.dialog.open(AddSessionComponent ,dialogConfig )
  }


}