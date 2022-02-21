import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/services/auth.decorator';
import { ReportService } from '../services/report.service';

@ApiTags("Report")
@ApiBearerAuth("access_token")
@Auth()
@Controller('admin/report')
export class ReportController {

  constructor(private readonly reportService: ReportService) {}

  @Get('/leadcount')
  leadcount(@Request() req) {
    return this.reportService.leadcount(req);
  }

  @Get('usercount')
  usercount(@Request() req) {
    return this.reportService.usercount(req);
  }

  @Get('visitorcount')
  visitorcount(@Request() req) {
    return this.reportService.visitorcount(req);
  }

}
