import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  name : string = "Ayush Govil";
  numberOfUpcount : number = 0;
  darkBackgroundHover : boolean = false;
  darkBackgroundClick : boolean = false;
  edited : boolean = false;
  @Input() commentItem : Array<string | number> = []
  comment : string = ''
  uniqueId : number = 0;
  commentEdit : boolean = false;
  previousComment : string = "";
  disableEditButtons : boolean = false;
  allReplies : Array<Array<any | number>> = [];
  replyUniqueId : number = 0;
  showReplyBox : boolean = false;
  reply : string = '';
  replyEdited : boolean = false;
  disableReplyEditButton : boolean = true;
  previousReply : string = '';
  @Output() emitUniqueId = new EventEmitter<number>();

  ngOnChanges()
  {
    this.comment = <string>this.commentItem[0];
    this.uniqueId = <number>this.commentItem[1];
  }

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
  deleteComment()
  {
    this.emitUniqueId.emit(this.uniqueId);
  }
  enableEdit()
  {
    this.commentEdit = true;
    this.previousComment = this.comment;
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
    let comment = this.comment;
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
    this.allReplies.push([this.reply, this.replyUniqueId])
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

  createReplyFromChild()
  {
    let namePointer = '@' + this.name + ' ';
    this.addReply(namePointer)
  }
}
