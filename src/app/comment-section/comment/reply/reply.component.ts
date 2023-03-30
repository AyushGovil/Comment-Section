import { Component,Input,Output,EventEmitter } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent {
  @Input() reply : string | number = "";
  @Input() replyUniqueId : string | number = 0;
  @Input() name : string | number = "";
  @Input() imgSrc : string | number = "";
  currentName : string = '';
  currentImgSrc : string = '';
  edited : boolean = false;
  replyEdit : boolean = false;
  darkBackgroundClick : boolean = false;
  darkBackgroundHover : boolean = false;
  numberOfUpcount : number = 0;
  disableEditButtons : boolean = false;
  previousReply : string = '';
  usersWhoUpvoted = new Set();
  @Output() emitUniqueIdToDelete = new EventEmitter<number>();
  @Output() initiateNewReply = new EventEmitter<string | number>();

  ngOnInit()
  {
    this.userService.userSubject$.subscribe((data)=> 
    {
      this.currentName = data.name
      this.currentImgSrc = data.imgSrc
      if (this.usersWhoUpvoted.has(this.currentName))
      {
        this.darkBackgroundClick = true;
      }
      else 
      {
        this.darkBackgroundClick = false;
      }
    })
  }

  constructor(private userService : UserService)
  {

  }

  toggleUpvoteBackground()
  {
    this.darkBackgroundClick = !this.darkBackgroundClick;
    this.darkBackgroundHover = this.darkBackgroundClick;
    if(this.darkBackgroundClick)
    {
      this.numberOfUpcount = this.numberOfUpcount+1;
      this.usersWhoUpvoted.add(this.currentName)
    }
    else
    {
      this.numberOfUpcount = this.numberOfUpcount-1;
      this.usersWhoUpvoted.delete(this.currentName)
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
    console.log(this.name)
    this.initiateNewReply.emit(this.name);
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
