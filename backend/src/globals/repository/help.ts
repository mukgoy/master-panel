import { MasterUserEntity } from "../entities/master-user.entity";

export function createRepo(entity, createDto){
    let owner = new MasterUserEntity();
    owner.userId = createDto.req.user.owner.userId
    entity.owner = owner;
    entity.createdBy = createDto.req.user.userId;
    return entity;
}