import { Module } from '@nestjs/common';

import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { MasterUserController } from './controllers/master-user.controller';
import { MasterUserService } from './services/master-user.service';

@Module({
  controllers: [MasterUserController, UploadController, CustomerController, ReportController],
  providers: [MasterUserService, UploadService, CustomerService, ReportService]
})
export class AdminModule {}
