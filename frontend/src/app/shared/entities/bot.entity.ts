import { ChatMessageEntity } from "./chat-message.entity";
import { ChatUserEntity } from "./chat-user.entity";
import { CommonProperty } from "./common.property";
import { FaqEntity } from "./faq.entity";
import { UserEntity } from "./user.entity";

export class BotDefaultJsondata {
    isGradient = true;
    bgColor1 = "#50cccc";
    bgColor2 = "#45aeca";
    textColor = "#FFFFFF";
    header = {
        text : "I am a Robot",
        logo : "./assets/mybot/images/bot-header-1.svg"
    };
    launcher = {
        logo : "./assets/mybot/images/launcher-3.svg",
        text : "Help"
    }
}

export class BotDefaultOnboardjson {
    welcomeMsg = "<p>Hey there, I am LALA!. Hope you are doing good.</p><p>Thanks for reaching out to our support</p>";
    askEmailMsg = "Please provide your email to connect.";
    askPhoneMsg = "Please provide your phone number to connect.";
    askNameMsg = "Please provide your name.";
}

export class BotEntity extends CommonProperty{
    botId?: string;
    name?: string;
    jsondata: BotDefaultJsondata = new BotDefaultJsondata();
    onboardjson: BotDefaultOnboardjson = new BotDefaultOnboardjson()
    isActive?: boolean = true;
    owner?: UserEntity;
    faqs?: FaqEntity[];
    chats?: ChatMessageEntity[];
    chatUsers?: ChatUserEntity[];
    constructor(data?: Partial<BotEntity>) {
        super()
        Object.assign(this, data);
    }
}
