import { Component,OnInit,EventEmitter,Inject } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  onEmitStatusChange=new EventEmitter();
  details:any={};
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public themeService:ThemeService){}

  ngOnInit():void{
    if(this.dialogData){
      this.details=this.dialogData;
    }
  }
  handleChangeAction(){
    this.onEmitStatusChange.emit();
  }

}
