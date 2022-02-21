import { EntityRepository, Repository } from "typeorm";
import { BotEntity } from "../entities";
import { FaqEntity } from "../entities/faq.entity";
import { createRepo } from "./help";

@EntityRepository(FaqEntity)
export class FaqRepository extends Repository<FaqEntity> { 

    async createFaq(createFaqDto){
        let faq = new FaqEntity();
        faq.question = createFaqDto.question;
        faq.answer = createFaqDto.answer;
        faq = createRepo(faq, createFaqDto)

        faq.bot = new BotEntity();
        faq.bot.botId = createFaqDto.botId

        return faq.save();
    }

    async updateFaq(updateFaqDto){
        let faq = await this.findOne(updateFaqDto.faqId);
        faq.question = updateFaqDto.question;
        faq.answer = updateFaqDto.answer;
        faq.updatedBy = updateFaqDto.req.user.userId;
        return faq.save();
    }
}