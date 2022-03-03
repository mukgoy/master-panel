import { Injectable } from '@angular/core';
import { ChatService } from 'src/app/mybot/services/chat.service';
import { MsgService } from 'src/app/mybot/services/msg.service';
import { StoreService } from 'src/app/mybot/services/store.service';
import { ChatMessageEntity, ChatUserEntity, ChatUserType } from 'src/app/shared/entities';
import { ApiHttpService } from 'src/app/shared/services';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class ChatAgentService {

  onboardjson: any;
  constructor(
    public http: ApiHttpService,
    public store: StoreService,
    public msgService: MsgService,
    public chatService: ChatService
  ) { }

	isConnected = false
  init() {
    if(!this.isConnected){
			this.isConnected = true
			this.connect()
		}
  }

  connect() {
		this.msgService.connectChatServer()
    this.initAllSubscribers();
  }

	initAllSubscribers() {
    this.chatService.onMessageReceived('reconnect').subscribe((res: any) => {
      console.log("reconnect", res);
    });
    this.chatService.onMessageReceived('updateOnlineUsers').subscribe((res: any) => {
      console.log("updateOnlineUsers", res);
      if (res.connect) {
        this.store.onlineUsers.unshift(res.connect.user)
      } else if (res.disconnect) {
        const index = this.store.onlineUsers.findIndex(x => x.id === res.disconnect.user.id);
        if (index > -1) {
          this.store.onlineUsers.splice(index, 1);
        }
      }
    });
    this.chatService.onMessageReceived('lastMessage').subscribe((lastMessage: ChatMessageEntity) => {
      console.log("lastMessage", lastMessage);
      // console.log("onlineUsers", this.store.onlineUsers);
      let user = this.store.onlineUsers.find(item => item.id == lastMessage.sender?.id);
      if (user) {
        user.lastMessage = lastMessage
        user.chatMessages = user.chatMessages || []
        user.chatMessages.push(lastMessage)
      }
    });
    this.chatService.newSocketSubject.subscribe((res: boolean) => {
      if(!res){return}
      let botIds = this.store.bots.map(bot => bot.botId)
      this.chatService.getOnlineUsers({ botIds })
      .then((onlineUsers: ChatUserEntity[]) => {
        console.log("getOnlineUsers", onlineUsers);
        onlineUsers.map(item => { item.chatMessages = [] })
        this.store.onlineUsers = onlineUsers
      });
    })
  }
}
