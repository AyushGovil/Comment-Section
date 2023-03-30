import { Component } from '@angular/core';
import { UserService } from './service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name : string = "Ayush Govil";
  imgSrc : string = "assets/images/my_photo.jpeg";
  title : string = 'comment-section';
  comment : string = '';
  allComments : Array<Array<string | number>> = [];
  uniqueId : number = 0;
  disablePost : boolean = true;

  ngOnInit()
  {
    this.userService.updateUser({'name': this.name, 'imgSrc': this.imgSrc})
  }
  constructor(private userService: UserService)
  {
  }
  addComment()
  {
    this.uniqueId = this.uniqueId + 1;
    let comment = [this.comment,this.uniqueId, this.name, this.imgSrc]
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

  chooseUser(event:any)
  {
    this.name = event.target.value;
    if(this.name === "Ayush Govil")
    {
      this.imgSrc = "assets/images/my_photo.jpeg";
    } 
    else 
    {
      this.imgSrc = "assets/images/sushant.jpeg"; 
    }
    this.userService.updateUser({'name': this.name, 'imgSrc': this.imgSrc})
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
