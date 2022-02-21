import { Controller, Post, Param, Delete, UseInterceptors, UploadedFile, Get, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Express } from 'express'
import { Permission } from 'src/auth/enums';
import { Auth } from 'src/auth/services/auth.decorator';
import { storage } from '../services/storage.config';
import { UploadService } from '../services/upload.service';

@ApiTags("Upload")
@ApiBearerAuth("access_token")
@Auth()
@Controller('admin/upload')
export class UploadController {

  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',{ storage }))
  create(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.uploadService.create({...file, req});
  }

  @Get()
  findAll(@Request() req) {
    return this.uploadService.findAll(req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(id);
  }
}
