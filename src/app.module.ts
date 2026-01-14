import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EquipmentModule } from './equipment/equipment.module';
import { LoansModule } from './loans/loans.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database.sqlite', // <-- הקובץ הזה הוא ה"database"
      autoLoadModels: true, // מטעין את כל המודלים שהגדרת
      synchronize: true, // יוצר טבלאות חדשות אם אין
    }),
    UsersModule,
    EquipmentModule,
    LoansModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
