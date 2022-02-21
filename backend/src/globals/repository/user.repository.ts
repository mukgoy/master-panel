import { SocialDto } from "src/auth/dto/social.dto";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async createUser(signupDto) {
        let user = new UserEntity();
        user.name = signupDto.name;
        user.email = signupDto.email;
        user.primaryKey = signupDto.email;
        user.password = signupDto.password;
        return user.save();
    }

    async socialLogin(socialDto: SocialDto) {
        let user = new UserEntity(socialDto);
        user.primaryKey = socialDto.email;
        user.password = new Date().getTime().toString();
        user = await user.save().catch(err => {
            if (err.writeErrors) {
                return this.findByEmail(user.email);
            }
        });
        if (user && !user.owner) {
            user.owner = new UserEntity();
            user.owner.userId = user.userId
        }
        return user
    }

    async findByEmail(email: string): Promise<UserEntity> {
        let user = await this.findOne({
            where: { email },
            relations: ["owner"],
        });
        if (user && !user.owner) {
            user.owner = new UserEntity();
            user.owner.userId = user.userId
        }
        return user
    }
}