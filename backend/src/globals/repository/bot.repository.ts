import { EntityRepository, Repository } from "typeorm";
import { BotEntity } from "../entities/bot.entity";
import { createRepo } from "./help";

@EntityRepository(BotEntity)
export class BotRepository extends Repository<BotEntity> { 

    async createBot(createBotDto){
        let bot = new BotEntity();
        bot.name = createBotDto.name;
        bot.jsondata = createBotDto.jsondata;
        bot = createRepo(bot, createBotDto)
        return bot.save();
    }

    async updateBot(updateBotDto){
        let bot = await this.findOne(updateBotDto.botId);
        bot.name = updateBotDto.name;
        bot.jsondata = updateBotDto.jsondata;
        bot.onboardjson = updateBotDto.onboardjson;
        bot.updatedBy = updateBotDto.req.user.userId;
        return bot.save();
    }
}