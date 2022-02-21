import { EntityRepository, Repository } from "typeorm";
import { UploadEntity } from "../entities/upload.entity";
import { createRepo } from "./help";

@EntityRepository(UploadEntity)
export class UploadRepository extends Repository<UploadEntity> { 

    async createUpload(createUploadDto){
        let upload = new UploadEntity();
        upload.originalname = createUploadDto.originalname;
        upload.filename = createUploadDto.filename;
        upload.path = createUploadDto.path;
        upload.size = createUploadDto.size;
        upload = createRepo(upload, createUploadDto)
        return upload.save();
    }
}