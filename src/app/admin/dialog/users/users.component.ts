import { Component,EventEmitter,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppUserService } from 'src/app/services/app-user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  onAddUser=new EventEmitter();
  onEditUser=new EventEmitter();
  usersForm:any=FormGroup;
  dialogAction:any="Add";
  action:any="Add";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  public dialogRef:MatDialogRef<UsersComponent>,
  private snackBarService:SnackbarService,
  public themeService:ThemeService,
  private appUserService:AppUserService,
  private ngxService:NgxUiLoaderService){}

  ngOnInit(): void {
    this.usersForm=this.formBuilder.group({
      email:[null,[Validators.required]],
      name:[null,[Validators.required]],
      password:[null,[Validators.required]]
    });
    if(this.dialogData.action==='Edit'){
      this.dialogAction='Edit';
      this.action='Update';
      this.usersForm.patchValue(this.dialogData.data);
      this.usersForm.controls['password'].setValue('password');
    }
  }

  handleSubmit(){
    if(this.dialogAction=="Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }
  
  add(){
    console.log("hi")
    this.ngxService.start();
    var formData=this.usersForm.value;
    var data={
      email:formData.email,
      name:formData.name,
      password:formData.password
    }
    this.appUserService.addNewAppUser(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onAddUser.emit();
      this.responseMessage=response.message;
      this.snackBarService.openSnackBar(this.responseMessage);
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
  edit(){
    this.ngxService.start();
    var formData=this.usersForm.value;
    var data={
      email:formData.email,
      name:formData.name,
      id:this.dialogData.data.id
    }
    this.appUserService.updateUser(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditUser.emit();
      this.responseMessage=response.message;
      this.snackBarService.openSnackBar(this.responseMessage);
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

}
