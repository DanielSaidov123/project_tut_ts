// // חיבור Sequelize ל־Database

// import { SequelizeModule } from '@nestjs/sequelize';
// import { User } from './users/user.model';
// import { Equipment } from './equipment/equipment.model';
// import { Loan } from './loans/loan.model';

// SequelizeModule.forRoot({
//   dialect: 'sqlite',       // או 'mysql'
//   storage: 'database.sqlite', // אם SQLite
//   autoLoadModels: true,
//   synchronize: true,
// }),



// // 6️⃣ יצירת מודלים (טבלאות) + קשרים

// import { Column, Model, Table, HasMany } from 'sequelize-typescript';
// import { Loan } from '../loans/loan.model';

// @Table
// export class User extends Model {
//   @Column
//   username: string;

//   @Column
//   password: string;

//   @Column
//   role: string;

//   @HasMany(() => Loan)
//   loans: Loan[];
// }


// // npm install --save @nestjs/jwt bcrypt
// // npm install --save-dev @types/bcrypt


// // 8️⃣ AuthService – יצירת JWT

// @Injectable()
// export class AuthService {
//   constructor(private jwtService: JwtService, private usersService: UsersService) {}

//   async signIn(username: string, password: string) {
//     const user = await this.usersService.findOneHuth(username);
//     if (!user) throw new UnauthorizedException('User not found');

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) throw new UnauthorizedException('Invalid credentials');

//     const payload = { sub: user.id, username: user.username, role: user.role };
//     return { access_token: this.jwtService.sign(payload) };
//   }
// }


// // 9️⃣ RolesGuard – בדיקת JWT + role
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector, private jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!requiredRoles) return true;

//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;
//     if (!authHeader) throw new ForbiddenException('No token provided');

//     const parts = authHeader.split(' ');
//     if (parts.length !== 2 || parts[0] !== 'Bearer')
//       throw new ForbiddenException('Invalid authorization header format');

//     const token = parts[1];
//     let payload: any;
//     try {
//       payload = this.jwtService.verify(token);
//       console.log('Payload from JWT:', payload);
//     } catch (err) {
//       throw new ForbiddenException('Invalid or expired token');
//     }

//     if (!requiredRoles.includes(payload.role))
//       throw new ForbiddenException(
//         `You do not have permission. Required: ${requiredRoles.join(', ')}, your role: ${payload.role}`
//       );

//     request.user = payload;
//     return true;
//   }
// }
