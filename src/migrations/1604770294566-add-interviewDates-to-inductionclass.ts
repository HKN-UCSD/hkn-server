import { MigrationInterface, QueryRunner } from 'typeorm';

export class addInterviewDatesToInductionclass1604770294566 implements MigrationInterface {
  name = 'addInterviewDatesToInductionclass1604770294566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "induction_class" ADD "interviewDates" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "induction_class" DROP COLUMN "interviewDates"`);
  }
}
