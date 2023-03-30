import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './comment-section/comment/comment.component';
import { ReplyComponent } from './comment-section/comment/reply/reply.component';
import { FormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    ReplyComponent
  ],
  imports: [
    NgxTrimDirectiveModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
