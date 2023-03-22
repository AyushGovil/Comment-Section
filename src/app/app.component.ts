import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'comment-section';
  comment : string = '';
  allComments : Array<Array<string | number>> = [];
  uniqueId : number = 0;
  disablePost : boolean = true;
  addComment()
  {
    this.uniqueId = this.uniqueId + 1;
    let comment = [this.comment,this.uniqueId]
    this.allComments.push(comment)
    this.comment = ""
    this.disablePost = true;
  }

  checkCommentSpace()
  {
    let comment = this.comment;
    if (comment.trim().length === 0)
    {
      this.disablePost = true;
      return;
    }
    this.disablePost = false;
   
  }

  deleteComment(uniqueId:number)
  {
    for(let i=0;i<this.allComments.length;i++)
    {
      if (<number>this.allComments[i][1] === uniqueId)
      {
        this.allComments.splice(i,1)
        break;
      }
    }
  }
}
