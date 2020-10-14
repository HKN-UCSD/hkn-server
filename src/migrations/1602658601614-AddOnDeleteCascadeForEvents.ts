import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOnDeleteCascadeForEvents1602658601614 implements MigrationInterface {
  name = 'AddOnDeleteCascadeForEvents1602658601614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rsvp" DROP CONSTRAINT "FK_14d4f4054ecf49c45bd4fb49366"`);
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_f89c5a18dbf866ba8b1e4a9b8e9"`
    );
    await queryRunner.query(
      `ALTER TABLE "rsvp" ADD CONSTRAINT "FK_14d4f4054ecf49c45bd4fb49366" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_f89c5a18dbf866ba8b1e4a9b8e9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_f89c5a18dbf866ba8b1e4a9b8e9"`
    );
    await queryRunner.query(`ALTER TABLE "rsvp" DROP CONSTRAINT "FK_14d4f4054ecf49c45bd4fb49366"`);
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_f89c5a18dbf866ba8b1e4a9b8e9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
    await queryRunner.query(
      `ALTER TABLE "rsvp" ADD CONSTRAINT "FK_14d4f4054ecf49c45bd4fb49366" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
  }
}
