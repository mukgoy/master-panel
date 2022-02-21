import { UpdateResourceUsageDto } from "src/admin/dto/update-resource-usage.dto";
import { EntityRepository, Repository } from "typeorm";
import { ResourceUsageEntity } from "../entities";

@EntityRepository(ResourceUsageEntity)
export class ResourceUsageRepository extends Repository<ResourceUsageEntity> {

	async updateUsage(updateDto: UpdateResourceUsageDto) {
		let item = await this.findOne(updateDto.id);
		item.usage = updateDto.usage;
		item.updatedAt = new Date();
		return item.save();
	}

}