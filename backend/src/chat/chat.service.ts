import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { ChatMessageEntity, ChatUserType } from 'src/globals/entities';
import { ChatMessageRepository } from 'src/globals/repository/chat-message.repository';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessageRepository)
    private readonly chatRepository: ChatMessageRepository
  ) { 
    setInterval(()=>{
      // console.log(this.connectedUsers);
    },5000)
  }

  public connectedUsers: any = {};

  async saveChat(chat: ChatMessageEntity): Promise<void> {
    const createdChat = this.chatRepository.create(chat);
    await createdChat.save();
  }

  userConnected(socket: Socket) {
    this.connectedUsers[socket.data.room] = this.connectedUsers[socket.data.room] || { sockets: [] };
    this.connectedUsers[socket.data.room].sockets.push(socket.id);
    this.connectedUsers[socket.data.room].data = socket.data;

    if(this.connectedUsers[socket.data.room].sockets.length == 1){
      socket.broadcast.to(ChatUserType.BOT + socket.data.bot.botId).emit('updateOnlineUsers', {connect:socket.data});
    }
    // console.log("userConnected", this.connectedUsers)
  }

  async setLastMessage(socket: Socket, chat: ChatMessageEntity){
    // console.log("setLastMessage", {room:socket.data.room, socketdata:socket.data, cuser:this.connectedUsers[socket.data.room]});
    const createdChat = this.chatRepository.create(new ChatMessageEntity(chat));
    await createdChat.save();
		if(socket.data.user){
			socket.data.user.lastMessage = createdChat
    	this.connectedUsers[socket.data.room].data = socket.data;
		}
    return createdChat;
  }

  userDisconnected(socket: Socket) {
    console.log(socket.data.user?.type)
    if (socket.data.user?.type == ChatUserType.USER) {
      let index = this.connectedUsers[socket.data.room].sockets.indexOf(socket.id);
      if (index !== -1) {
        this.connectedUsers[socket.data.room].sockets.splice(index, 1);
      }
      if (this.connectedUsers[socket.data.room].sockets.length == 0) {
        delete this.connectedUsers[socket.data.room];
        socket.broadcast.to(ChatUserType.BOT + socket.data.bot.botId).emit('updateOnlineUsers', {disconnect:socket.data});
      }
    }
  }

  getConnectedUsers(data: {botIds:any[]}) {
    let users = [];
    // console.log(data, this.connectedUsers)
    for (let room in this.connectedUsers) {
      let socketdata = this.connectedUsers[room].data;
      if (data.botIds && data.botIds.indexOf(socketdata.bot.botId) > -1) {
        users.push(socketdata.user)
      }
    }
    return users
  }

}
