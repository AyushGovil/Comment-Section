import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
  @Input() reply : string | number = "";
  @Input() replyUniqueId : string | number = 0;
  edited : boolean = false;
  replyEdit : boolean = false;
  name : string = "Ayush Govil"
  darkBackgroundClick : boolean = false;
  darkBackgroundHover : boolean = false;
  numberOfUpcount : number = 0;
  disableEditButtons : boolean = false;
  previousReply : string = '';
  @Output() emitUniqueIdToDelete = new EventEmitter<number>();
  @Output() initiateNewReply = new EventEmitter<boolean>();

  toggleUpvoteBackground()
  {
    this.darkBackgroundClick = !this.darkBackgroundClick;
    this.darkBackgroundHover = this.darkBackgroundClick;
    if(this.darkBackgroundClick)
    {
      this.numberOfUpcount = this.numberOfUpcount+1;
    }
    else
    {
      this.numberOfUpcount = this.numberOfUpcount-1;
    }
  }
  hoverIn()
  {
    this.darkBackgroundHover = true;
  }
  
  hoverOut()
  {
    this.darkBackgroundHover = false;
  }
 
  
  deleteReply()
  {
    this.emitUniqueIdToDelete.emit(<number>this.replyUniqueId);
  }

  addReply()
  {
    this.initiateNewReply.emit(true);
  }
  checkReplySpace()
  {
    let reply = <string>this.reply;
    if (reply.trim().length === 0)
    {
      this.disableEditButtons = true;
      return;
    }
    this.disableEditButtons = false;
  }

  enableEdit()
  {
    this.replyEdit = true;
    this.previousReply = <string>this.reply;
  }
  saveReply()
  {
    this.edited = true;
    this.replyEdit = false;
  }
  cancelEdit()
  {
    this.reply = this.previousReply;
    this.replyEdit = !this.replyEdit;
  }
}
