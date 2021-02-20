import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInterviewDates1606590962287 implements MigrationInterface {
  name = 'AddInterviewDates1606590962287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "induction_class" ADD "interviewDates" json`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "induction_class" DROP COLUMN "interviewDates"`);
  }
}
