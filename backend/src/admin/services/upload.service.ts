import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUploadDto } from '../dto/create-upload.dto';
import { UploadEntity } from '../../globals/entities/upload.entity';
import { UploadRepository } from 'src/globals/repository/upload.repository';
import { eventname } from 'src/globals/listeners/event-names';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UploadService {

  constructor(
		private eventEmitter: EventEmitter2,
    @InjectRepository(UploadRepository)
    private readonly uploadRepository: UploadRepository
  ) { }

  async create(createUploadDto: CreateUploadDto): Promise<UploadEntity> {
    let upload = await this.uploadRepository.createUpload(createUploadDto);
		this.eventEmitter.emit(eventname.upload.created, {user:createUploadDto.req.user, upload});
		return upload;
  }

  findAll(req) {
    return this.uploadRepository.find({
      where: {
        owner: req.user.owner.userId
      }
    });
  }

  remove(id: string) {
    return `This action removes a #${id} upload`;
  }
}
