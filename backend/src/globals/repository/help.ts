import { UserEntity } from "src/globals/entities/user.entity";

export function createRepo(entity, createDto){
    let owner = new UserEntity();
    owner.userId = createDto.req.user.owner.userId
    entity.owner = owner;
    entity.createdBy = createDto.req.user.userId;
    return entity;
}