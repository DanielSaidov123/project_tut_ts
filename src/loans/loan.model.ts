import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Equipment } from 'src/equipment/equipment.model';

@Table
export class Loan extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Equipment)
  @Column
  equipmentId: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  loanDate: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  returnDate: Date;

  @Column({
    type: DataType.ENUM('active', 'returned', 'expired', 'lost'),
    defaultValue: 'active',
  })
  status: string;

  @BelongsTo(() => User) // קשר חזרה למשתמש
  user: User;

  @BelongsTo(() => Equipment) // קשר חזרה לציוד
  equipment: Equipment;
}
