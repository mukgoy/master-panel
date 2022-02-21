import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { SocketData } from 'src/globals/enums';
import { ChatMessageEntity, ChatUserType } from 'src/globals/entities';

@WebSocketGateway({ namespace: 'chat', cors: true })
export class ChatGateway implements NestGateway {
  count = 0;
  constructor(private chatService: ChatService) { }

  @WebSocketServer()
  server;

  handleConnection(socket: any) {
    socket.emit('connected', "messages");
  }

  handleDisconnect(socket: any) {
    this.chatService.userDisconnected(socket)
  }

  @SubscribeMessage('setSocketData')
  async setSocketData(socket: Socket, data: SocketData): Promise<boolean> {
    // console.log("setSocketData", socket.data)
    if (data.user.type == ChatUserType.USER) {
      // console.log(`${data.user.type} of id = ${data.user.id} setSocketData with the room : ${room}`);
      let room: string = ChatUserType.USER + data.user.id;
      data.room = room
      socket.data = data
      socket.join(room);
      this.chatService.userConnected(socket)
    }
    return true
  }

  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, room: string) {
    console.log("joinRoom");
    socket.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(socket: Socket, data: any) {
    console.log("leaveRoom");
    socket.broadcast.to(data.room).emit('left room', { user: data.user, message: 'has left this room.' });
    socket.leave(data.room);
  }

  @SubscribeMessage('message')
  async handleNewMessage(socket: Socket, data: ChatMessageEntity) {
    // console.log("handleNewMessage", data)
    data.room = data.room || socket.data.room;
    if (data.room) {
      console.log(`${data.sender.type}:${data.sender.id} send the message in room : ${data.room}: ${data.message}`);
      socket.broadcast.to(data.room).emit('message', data);
      const createdChat = await this.chatService.setLastMessage(socket, data)
      if (data.sender.type != ChatUserType.AGENT) {
        socket.broadcast.to(ChatUserType.BOT + data.bot.botId).emit('lastMessage', createdChat);
      }
    }else{
      console.log(`${data.sender.type} msg from test bot`);
    }
  }

  @SubscribeMessage('getOnlineUsers')
  async getOnlineUsers(socket: Socket, data: { botIds: any[] }): Promise<any> {
    // console.log("getOnlineUsers", data);
    data.botIds.forEach(botId => {
      socket.join(ChatUserType.BOT + botId);
    });

    return this.chatService.getConnectedUsers(data)
  }
}
