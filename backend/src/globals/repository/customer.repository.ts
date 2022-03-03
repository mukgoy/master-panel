import { UpdateCustomerDto } from "src/admin/dto/update-customer.dto";
import { SocialDto } from "src/auth/dto/social.dto";
import { EntityRepository, Repository } from "typeorm";
import { CustomerEntity } from "../entities/customer.entity";

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {

    async createUser(signupDto) {
        let user = new CustomerEntity();
        user.name = signupDto.name;
        user.email = signupDto.email;
        user.password = signupDto.password;
        return user.save();
    }

    async socialLogin(socialDto: SocialDto) {
        let user = new CustomerEntity(socialDto);
        user.password = new Date().getTime().toString();
        user = await user.save().catch(err => {
            if (err.writeErrors) {
                return this.findByEmail(user.email);
            }
        });
        if (user && !user.owner) {
            user.owner = new CustomerEntity();
            user.owner.userId = user.userId
        }
        return user
    }

    async findByEmail(email: string): Promise<CustomerEntity> {
        let user = await this.findOne({
            where: { email },
            relations: ["owner"],
        });
        if (user && !user.owner) {
            user.owner = new CustomerEntity();
            user.owner.userId = user.userId
        }
        return user
    }

		async updateUser(updateCustomerDto:UpdateCustomerDto) {
			delete updateCustomerDto.req
			console.log(updateCustomerDto);
			let user = await this.findOne(updateCustomerDto.userId);
			if (user) {
					delete updateCustomerDto.userId
					Object.assign(user, updateCustomerDto);
					return user.save();
			}
	}
}