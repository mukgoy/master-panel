import { ObjectID } from "typeorm";
import { BotEntity, ChatUserEntity } from "./entities";

export interface SocketData {
    bot: BotEntity
    user: ChatUserEntity
    room: string
}
