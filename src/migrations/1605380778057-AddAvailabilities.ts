import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvailabilities1605380778057 implements MigrationInterface {
  name = 'AddAvailabilities1605380778057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_user" ADD "availabilities" json`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "availabilities"`);
  }
}
