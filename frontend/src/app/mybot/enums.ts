import { environment } from "src/environments/environment"
import { BotEntity, ChatUserEntity } from "../shared/entities"

export const userbotConfig = {
    uploads : environment.uploads,
    backend : environment.backend + "api/v1/userbot/",
    frontend : environment.frontend
}

export const userbotApi = {
    getFaqs: userbotConfig.backend + 'get-faqs/',
    getBotUi: userbotConfig.backend + 'get-botui/',
    createUser: userbotConfig.backend + 'create-user',
    updateUser: userbotConfig.backend + 'update-user/',
    getPreviousMessages: userbotConfig.backend + 'get-previous-messages',
}

export class SocketData {
    bot?: BotEntity
    user?: ChatUserEntity
    room?: string
    constructor(data?: Partial<SocketData>) {
        Object.assign(this, data);
    }
}