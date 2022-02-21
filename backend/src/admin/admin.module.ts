import { Module } from '@nestjs/common';
import { BotController } from './controllers/bot.controller';
import { BotService } from './services/bot.service';
import { FaqController } from './controllers/faq.controller';
import { FaqService } from './services/faq.service';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { ResourceUsageController } from './controllers/resource-usage.controller';
import { ResourceUsageService } from './services/resource-usage.service';

@Module({
  controllers: [BotController, FaqController, UploadController, CustomerController, ReportController, ResourceUsageController],
  providers: [BotService, FaqService, UploadService, CustomerService, ReportService, ResourceUsageService],
  
})
export class AdminModule {}
