import { Component ,EventEmitter,Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit{
  practiceForm:FormGroup;
  dialogAction='Add';
  responseMessage:any;
  onAddPractice=new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,private formBuilder:FormBuilder, 
    private categoryService:CategoryService,
    public ngxService:NgxUiLoaderService,
    private snackBarService:SnackbarService,
    public themeService:ThemeService,
    public dialogRef:MatDialogRef<PracticeComponent>){}
  ngOnInit(): void {
    this.practiceForm=this.formBuilder.group({
      name:[null,[Validators.required]]
    })
    if(this.dialogData.action=='Edit')
    {
      this.dialogAction='Edit';
      this.practiceForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit()
  {
    if(this.dialogAction=='Add'){
      this.add();
    }
    else{
      this.edit();
    }
  }
  add(){
    this.ngxService.start();
    var formData=this.practiceForm.value;
    var data={
      name:formData.name
    }
    this.categoryService.addNewCategory(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.onAddPractice.emit();
      this.dialogRef.close();
      this.responseMessage=response.message;
      this.snackBarService.openSnackBar(this.responseMessage);
    
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message)this.responseMessage=error.error?.message;
      else this.responseMessage=GlobalConstants.genericError;
      this.snackBarService.openSnackBar(this.responseMessage)
    })

    

  }
  edit(){
    this.ngxService.start();
    var formData=this.practiceForm.value;
    var data={
      id:this.dialogData.data.id,
      name:formData.name
    }
    this.categoryService.UpdateCategory(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.onAddPractice.emit();
      this.dialogRef.close();
      this.responseMessage=response.message;
      this.snackBarService.openSnackBar(this.responseMessage);
    
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message)this.responseMessage=error.error?.message;
      else this.responseMessage=GlobalConstants.genericError;
      this.snackBarService.openSnackBar(this.responseMessage)
    })
  }

}
