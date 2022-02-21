import { EntityRepository, Repository } from "typeorm";
import { ChatUserEntity, ChatUserType } from "../entities/chat-user.entity";

@EntityRepository(ChatUserEntity)
export class ChatUserRepository extends Repository<ChatUserEntity> {

    async createUser(createChatUserDto) {
        // console.log(createChatUserDto.req.user)
        let { name, email, phone, type, bot, owner } = createChatUserDto;
        owner = owner || createChatUserDto.req.user.owner
        type = type || ChatUserType.USER
        let primaryKey = email;
        let user = new ChatUserEntity({ name, email, phone, type, bot, owner, primaryKey });
        return user.save();
    }

    async updateUser(updateChatUserDto) {
        updateChatUserDto.req = {}
        console.log(updateChatUserDto);
        let user = await this.findOne(updateChatUserDto.id);
        if (user) {
            delete updateChatUserDto.id
            Object.assign(user, updateChatUserDto);
            return user.save();
        }
    }
}