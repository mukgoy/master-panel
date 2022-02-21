import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { UserEntity } from "src/globals/entities/user.entity";

export class CreateResourceUsageDto {

	@ApiProperty()
	owner: UserEntity;

	@IsString()
	@ApiProperty()
	resource: string;

	@IsInt()
	@ApiProperty()
	usage: number;

	public req?: any

}
