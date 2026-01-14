import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EquipmentModule } from './equipment/equipment.module';
import { LoansModule } from './loans/loans.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, EquipmentModule, LoansModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
