import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import listeners from './listeners';
import { MailModule } from './modules/mail/mail.module';
import repositories from './repository';
@Global()
@Module({
	imports: [
		EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(),
		TypeOrmModule.forFeature([...repositories]),
		MailModule,
	],
	providers: [...listeners],
	exports: [TypeOrmModule],
})
export class GlobalsModule { }
