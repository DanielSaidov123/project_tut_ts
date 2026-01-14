import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Loan } from '../loans/loan.model';

@Table
export class Equipment extends Model {
  @Column
  name: string;

  @Column
  totalAmount: number;

  @Column
  availableAmount: number;

  @HasMany(() => Loan)
  loans: Loan[];
}
