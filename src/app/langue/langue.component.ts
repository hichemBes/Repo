import { Component, OnInit } from '@angular/core';
import { LangueServiceService } from '../langue-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddLangueComponent } from './add-langue/add-langue.component';
import { UpdateLangueComponent } from './update-langue/update-langue.component';

@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.scss']
})
export class LangueComponent  implements  OnInit {
 

   langues : any
  dataSource: any;


  constructor(  public dialog: MatDialog , private  langueService :LangueServiceService ) {

    this.displayedColumns  = [ 'codeLangue','libelleLangue','actions'];
  }
  ngOnInit(): void {
debugger
   this.getallLanguaes();

  
  }


  totalItems: number = 100; // Total number of items


  pageSize: number = 10; // Number of items per page
  pageSizeOptions: number[] = [5, 10, 25, 100]; // Options for page size
  currentPageData: any[] = [];
  public displayedColumns: string[] | undefined 

  onPageChange(item:any){


  }

  openNumberModal(){
debugger
    const dialogConfig = new MatDialogConfig();

   
    dialogConfig.disableClose = false; 
     dialogConfig.autoFocus = false; 
    dialogConfig.width = '400px'; 
    dialogConfig.height =  '300px';

    const dialogRef = this.dialog.open(AddLangueComponent, dialogConfig);

  }

  editLangue(langue){
debugger
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false; // Disable closing the dialog by clicking outside of it
     dialogConfig.autoFocus = false; // Focus the first focusable element in the dialog by default
    dialogConfig.width = '400px'; // Set the width of the dialog
    dialogConfig.height =  '150px';
    dialogConfig.data = {
      // Pass data to the dialog component
      idLangue : langue.idLangue,
      codeLangue : langue.codeLangue,
      libelleLangue:langue.libelleLangue

    };
    const dialogRef = this.dialog.open(UpdateLangueComponent, dialogConfig);
  }

  deleteLangue(langue){


  }
  getallLanguaes =()=>{
debugger
 this.langueService.GetLangue().subscribe((res)=>{
debugger
      this.langues = res ;
      this.currentPageData = this.langues;
      

 })
  }
}
