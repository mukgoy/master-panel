import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUploadDto } from '../dto/create-upload.dto';
import { UploadEntity } from '../../globals/entities/upload.entity';
import { UploadRepository } from 'src/globals/repository/upload.repository';

@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(UploadRepository)
    private readonly uploadRepository: UploadRepository
  ) { }

  leadcount(req) {
    return this.uploadRepository.find({
      where: {
        owner: req.user.owner.userId
      }
    });
  }
  usercount(req) {
    return this.uploadRepository.find({
      where: {
        owner: req.user.owner.userId
      }
    });
  }
  visitorcount(req) {
    return this.uploadRepository.find({
      where: {
        owner: req.user.owner.userId
      }
    });
  }

}
