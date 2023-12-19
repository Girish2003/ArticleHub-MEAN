import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { PracticeComponent } from '../dialog/practice/practice.component';

@Component({
  selector: 'app-manage-practice',
  templateUrl: './manage-practice.component.html',
  styleUrls: ['./manage-practice.component.scss']
})
export class ManagePracticeComponent implements OnInit {
  tableHeader:string[]=['name','edit'];
  tableData:any;
  responseMessage:any;

  constructor(private ngxService:NgxUiLoaderService,
    private categoryService:CategoryService,
    private snackBarService:SnackbarService,
    public themeService:ThemeService,
    private matDialog:MatDialog){}


  ngOnInit(): void {
    this.ngxService.start();
    this.showTable();
  }
  showTable(){
    this.categoryService.getAllCategory().subscribe((response:any)=>{
      this.tableData=new MatTableDataSource(response);
      this.ngxService.stop();
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }
      else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage);


      
    })

  }
  applyFilter(event:Event){
    const htmlText=(event.target as HTMLInputElement).value;
    this.tableData.filter=htmlText.trim().toLowerCase();
  }
  handleAddAction(){
    const matDialogConfig=new MatDialogConfig();
    matDialogConfig.width="850px";
    matDialogConfig.data={
      action:'Add'
    }

    const dialogRef=this.matDialog.open(PracticeComponent,matDialogConfig);
    const res=dialogRef.componentInstance.onAddPractice.subscribe(
      (response:any)=>{
        this.showTable();
      }
    )



  }
  handleEditAction(values:any){
    const matDialogConfig=new MatDialogConfig();
    matDialogConfig.width="850px";
    matDialogConfig.data={
      action:'Edit',
      data:values
    }

    const dialogRef=this.matDialog.open(PracticeComponent,matDialogConfig);
    const res=dialogRef.componentInstance.onAddPractice.subscribe(
      (response:any)=>{
        this.showTable();
      }
    )



  }



}
