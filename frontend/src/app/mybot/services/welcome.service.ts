import { Injectable } from '@angular/core';
import { ChatUserType } from 'src/app/shared/entities';
import { userbotApi } from '../enums';
import { ApiHttpService } from './api-http.service';
import { ChatService } from './chat.service';
import { MsgService } from './msg.service';
import { StoreService } from './store.service';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  onboardjson: any;
  constructor(
    public http: ApiHttpService,
    public store: StoreService,
    public msgService: MsgService,
    public chatService: ChatService
  ) { }

  init() {
    setTimeout(() => {
      this.onboardjson = this.store.bot?.onboardjson
      this.welcomeMsg()
    },200)
  }

  welcomeMsg() {
    console.log(this.store.botUser);
    if(this.store.botUser.id){
      this.msgService.connectChatServer()
    }
    this.msgService.onBotReply(this.onboardjson.welcomeMsg);
    this.askEmailMsg()
  }

  askEmailMsg(msg = this.onboardjson.askEmailMsg) {
    if(this.store.botUser.email){
      return this.askPhoneMsg()
    }else{
      this.msgService.onBotReply(msg);
    }
    this.msgService.requiredUserInput().then(res => {
      console.log({ email: res });
      // let ChatUserEntity = ChatUserEntity
      this.http.post(userbotApi.createUser, { 
        email: res, 
        type: ChatUserType.USER, 
        bot:{botId:this.store.bot?.botId},
        owner:this.store.bot?.owner
      }).subscribe((user: any) => {
        this.store.botUser = user
        this.msgService.connectChatServer()
        this.askPhoneMsg()
      }, err => {
        this.askEmailMsg(err.error.message || this.onboardjson.askEmailMsg)
      });
    });
  }

  askPhoneMsg(msg = this.onboardjson.askPhoneMsg) {
    if(this.store.botUser.phone){
      return this.askNameMsg()
    }else{
      this.msgService.onBotReply(msg);
    }
    this.msgService.requiredUserInput().then(res => {
      console.log({ phone: res });
      let id = this.store.botUser.id;
      this.http.put(userbotApi.updateUser, { id: id, phone: res }).subscribe((user: any) => {
        this.store.botUser = user || this.store.botUser
        this.askNameMsg()
      }, err => {
        this.askPhoneMsg(err.error.message || this.onboardjson.askPhoneMsg)
      });
    });
  }

  askNameMsg(msg = this.onboardjson.askNameMsg) {
    if(this.store.botUser.name){
      return this.getChatHistory()
    }else{
      this.msgService.onBotReply(msg);
    }
    this.msgService.requiredUserInput().then(res => {
      console.log({ name: res });
      let id = this.store.botUser.id;
      this.http.put(userbotApi.updateUser, { id: id, name: res }).subscribe((user: any) => {
        this.store.botUser = user || this.store.botUser
        this.getChatHistory();
      }, err => {
        console.log(err);
        this.askNameMsg(err.error.message || this.onboardjson.askNameMsg)
      });
    });
  }

  getChatHistory(){
    console.log("call method to get chat history");
  }

}
