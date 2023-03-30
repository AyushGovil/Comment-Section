import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userSubject$ = new BehaviorSubject({name:'',imgSrc:''});

  updateUser(message : any)
  {
    this.userSubject$.next({name:message.name,imgSrc: message.imgSrc})
  }

}
