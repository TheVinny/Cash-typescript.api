import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactions1668543779459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'debitedAccount_id',
            type: 'uuid',
          },
          {
            name: 'creditedAccount_id',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'created_at',
            type: 'date',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'AccountDebited_Transaction',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['debitedAccount_id'],
            onDelete: 'SET NULL',
          },
          {
            name: 'AccountCredited_Transaction',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['creditedAccount_id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
