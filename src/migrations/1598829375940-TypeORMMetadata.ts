import { MigrationInterface, QueryRunner } from 'typeorm';

export class TypeORMMetadata1598829375940 implements MigrationInterface {
  name = 'TypeORMMetadata1598829375940';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "typeorm_metadata" ("type" varchar(255) NOT NULL, "database" varchar DEFAULT NULL, "schema" varchar(255) DEFAULT NULL, "table" varchar(255) DEFAULT NULL, "name" varchar(255) DEFAULT NULL, "value" text)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "typeorm_metadata"`);
  }
}
