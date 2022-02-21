import { BotRepository } from "./bot.repository";
import { ChatMessageRepository } from "./chat-message.repository";
import { FaqRepository } from "./faq.repository";
import { UploadRepository } from "./upload.repository";
import { UserRepository } from "./user.repository";
import { ChatUserRepository } from "./chat-user.repository";
import { ResourceUsageRepository } from "./resource-usage.repository";

export default [
    BotRepository,
    FaqRepository,
    UploadRepository,
    UserRepository,
    ChatMessageRepository,
    ChatUserRepository,
		ResourceUsageRepository
]