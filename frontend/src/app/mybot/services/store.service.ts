import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BotEntity, ChatUserEntity } from 'src/app/shared/entities';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  ls = localStorage;
  isAgent = false

  bots: BotEntity[] = [];
  onlineUsers: ChatUserEntity[] = []

  bot?: BotEntity;
  selectedUser?: ChatUserEntity;

  public botUserSubject: BehaviorSubject<ChatUserEntity>;
  constructor() {
    //use case for ChatUserType = agent
    const currentUser = this.ls.getItem('currentUser');
    let agentUser = currentUser !== null ? JSON.parse(currentUser) : null;
    if(agentUser){
      this.isAgent = true
    }

    const userJson = this.ls.getItem('botUser');
    let user = userJson !== null ? JSON.parse(userJson) : {};
    this.botUserSubject = new BehaviorSubject<ChatUserEntity>(user);
  }
  set botUser(user: ChatUserEntity) {
    if(!this.isAgent){
      this.ls.setItem('botUser', JSON.stringify(user))
    };
    this.botUserSubject.next(user);
  }
  get botUser() {
    // if(this.isAgent){ 
    //   return {} as ChatUserEntity
    // }
    return this.botUserSubject.value;
  }

}
