import { Component,Input,Output,EventEmitter } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() name : string | number= "";
  @Input() imgSrc : string | number = "";
  @Input() comment : string | number = ''
  @Input() uniqueId : string | number = 0;
  currentName : string = '';
  currentImgSrc : string = '';
  numberOfUpcount : number = 0;
  darkBackgroundHover : boolean = false;
  darkBackgroundClick : boolean = false;
  edited : boolean = false;
  commentEdit : boolean = false;
  previousComment : string = "";
  disableEditButtons : boolean = false;
  allReplies : Array<Array<any | number>> = [];
  replyUniqueId : number = 0;
  showReplyBox : boolean = false;
  reply : string = '';
  replyEdited : boolean = false;
  disableReplyEditButton : boolean = true;
  usersWhoUpvoted = new Set();
  previousReply : string = '';
  @Output() emitUniqueId = new EventEmitter<number>();

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
  deleteComment()
  {
    this.emitUniqueId.emit(<number>this.uniqueId);
  }
  enableEdit()
  {
    this.commentEdit = true;
    this.previousComment =  <string>this.comment;
  }
  saveComment()
  {
    this.edited = true;
    this.commentEdit = false;
  }

  cancelEdit()
  {
    this.comment = this.previousComment;
    this.commentEdit = !this.commentEdit;
  }
  checkCommentSpace()
  {
    let comment = <string>this.comment;
    if (comment.trim().length === 0)
    {
      this.disableEditButtons = true;
      return;
    }
    this.disableEditButtons = false;
  }

  checkReplySpace()
  {
    let reply = this.reply;
    if (reply.trim().length === 0)
    {
      this.disableReplyEditButton = true;
      return;
    }
    this.disableReplyEditButton = false;
  }
  addReply(namePointer = '')
  {
    this.showReplyBox = true;
    this.reply = '' + namePointer;
    this.disableReplyEditButton = true;
  }
  saveReply()
  {
    this.replyUniqueId = this.replyUniqueId + 1;
    this.allReplies.push([this.reply, this.replyUniqueId, this.currentName, this.currentImgSrc])
    this.showReplyBox = false;
    
  }
  cancelReplyEdit()
  {
    this.showReplyBox = false;
  }
  deleteReply(replyUniqueId:number)
  {
    for(let i=0;i<this.allReplies.length;i++)
    {
      if (<number>this.allReplies[i][1] === replyUniqueId)
      {
        this.allReplies.splice(i,1)
        break;
      }
    }
  }

  createReplyFromChild(nameToReply :any)
  {
    let namePointer = '@' + nameToReply + ' ';
    this.addReply(namePointer)
  }
}
