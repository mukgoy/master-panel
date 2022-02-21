import { Module } from '@nestjs/common';
import { UserbotService } from './userbot.service';
import { UserbotController } from './userbot.controller';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [AdminModule],
  controllers: [UserbotController],
  providers: [UserbotService]
})
export class UserbotModule {}
