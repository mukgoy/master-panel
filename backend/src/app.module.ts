import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { GlobalsModule } from './globals/globals.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    GlobalsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
