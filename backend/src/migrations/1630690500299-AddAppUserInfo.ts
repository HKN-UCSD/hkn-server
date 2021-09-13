import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAppUserInfo1630690500299 implements MigrationInterface {
  name = 'AddAppUserInfo1630690500299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."app_user" ADD "preferredName" character varying`
    );
    await queryRunner.query(`ALTER TABLE "public"."app_user" ADD "pronoun" character varying`);
    await queryRunner.query(
      `ALTER TABLE "public"."app_user" ADD "customPronoun" character varying`
    );
    await queryRunner.query(`ALTER TABLE "public"."app_user" ADD "infoSession" character varying`);
    await queryRunner.query(`ALTER TABLE "public"."app_user" ADD "courseRequirement" boolean`);
    await queryRunner.query(`ALTER TABLE "public"."app_user" ADD "newsletter" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."app_user" DROP COLUMN "newsletter"`);
    await queryRunner.query(`ALTER TABLE "public"."app_user" DROP COLUMN "courseRequirement"`);
    await queryRunner.query(`ALTER TABLE "public"."app_user" DROP COLUMN "infoSession"`);
    await queryRunner.query(`ALTER TABLE "public"."app_user" DROP COLUMN "customPronoun"`);
    await queryRunner.query(`ALTER TABLE "public"."app_user" DROP COLUMN "pronoun"`);
    await queryRunner.query(`ALTER TABLE "public"."app_user" DROP COLUMN "preferredName"`);
  }
}
