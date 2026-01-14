import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Loan } from './loan.model';

@Module({
  imports: [SequelizeModule.forFeature([Loan])],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
