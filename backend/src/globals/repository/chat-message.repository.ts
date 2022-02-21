import { EntityRepository, Repository } from "typeorm";
import { ChatMessageEntity } from "../entities";

@EntityRepository(ChatMessageEntity)
export class ChatMessageRepository extends Repository<ChatMessageEntity> { 

}