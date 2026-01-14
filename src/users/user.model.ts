import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Loan } from 'src/loans/loan.model';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column({
    type: DataType.ENUM('soldier', 'commander'),
    defaultValue: 'soldier',
  })
  role: string;

  @HasMany(() => Loan) // קשר למשהו שהוא יוצר – Loan
  loans: Loan[];
}
