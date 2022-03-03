import { SocialDto } from "src/auth/dto/social.dto";
import { EntityRepository, Repository } from "typeorm";
import { MasterUserEntity } from "../entities/master-user.entity";

@EntityRepository(MasterUserEntity)
export class MasterUserRepository extends Repository<MasterUserEntity> {

    async createUser(signupDto) {
        let user = new MasterUserEntity();
        user.name = signupDto.name;
        user.email = signupDto.email;
        user.password = signupDto.password;
        return user.save();
    }

    async socialLogin(socialDto: SocialDto) {
        let user = new MasterUserEntity(socialDto);
        user.password = new Date().getTime().toString();
        user = await user.save().catch(err => {
            if (err.writeErrors) {
                return this.findByEmail(user.email);
            }
        });
        if (user && !user.owner) {
            user.owner = new MasterUserEntity();
            user.owner.userId = user.userId
        }
        return user
    }

    async findByEmail(email: string): Promise<MasterUserEntity> {
        let user = await this.findOne({
            where: { email },
            relations: ["owner"],
        });
        if (user && !user.owner) {
            user.owner = new MasterUserEntity();
            user.owner.userId = user.userId
        }
        return user
    }
}