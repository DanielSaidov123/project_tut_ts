import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'bhrweaboajbiohrJMGHIOJRIEOGHreajgoijrg[JGBrngh[GJ[gbjrjojgjwg', // תחליף למשהו חזק
      signOptions: { expiresIn: '1h' }, // התוקן יהיה תקף לשעה
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
