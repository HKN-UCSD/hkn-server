import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1598831126707 implements MigrationInterface {
  name = 'InitialSchema1598831126707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "induction_class" ("quarter" character varying NOT NULL, "name" character varying NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, CONSTRAINT "PK_dde0d4bef327db4d10c2d927ff5" PRIMARY KEY ("quarter"))`
    );
    await queryRunner.query(
      `CREATE TYPE "app_user_role_enum" AS ENUM('admin', 'officer', 'member', 'inductee', 'guest')`
    );
    await queryRunner.query(
      `CREATE TABLE "app_user" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "major" character varying, "graduationYear" character varying, "role" "app_user_role_enum" NOT NULL DEFAULT 'guest', "inductionClassQuarter" character varying, CONSTRAINT "UQ_3fa909d0e37c531ebc237703391" UNIQUE ("email"), CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "rsvp" ("eventId" integer NOT NULL, "appUserId" integer NOT NULL, CONSTRAINT "PK_c17e35e47fcff9ed8d3c049f912" PRIMARY KEY ("eventId", "appUserId"))`
    );
    await queryRunner.query(
      `CREATE TYPE "event_type_enum" AS ENUM('professional', 'social', 'technical', 'mentorship')`
    );
    await queryRunner.query(
      `CREATE TYPE "event_status_enum" AS ENUM('pending', 'ready', 'complete')`
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "location" character varying, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "type" "event_type_enum", "status" "event_status_enum" NOT NULL DEFAULT 'pending', "fbURL" character varying, "canvaURL" character varying, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "attendance" ("duration" double precision, "isInductee" boolean NOT NULL, "attendeeId" integer NOT NULL, "officerId" integer, "eventId" integer NOT NULL, CONSTRAINT "PK_daee5fd9c1be1f6907cfe6869c6" PRIMARY KEY ("attendeeId", "eventId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "event_hosts_app_user" ("eventId" integer NOT NULL, "appUserId" integer NOT NULL, CONSTRAINT "PK_4863d0e1b2a8f5d470e5f255b15" PRIMARY KEY ("eventId", "appUserId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ae61de7bcb59f2b82c4218c9e7" ON "event_hosts_app_user" ("eventId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a62ab1e0e22487c58afd071c20" ON "event_hosts_app_user" ("appUserId") `
    );
    await queryRunner.query(
      `ALTER TABLE "app_user" ADD CONSTRAINT "FK_d307df54a9b4539f89d593d5d7d" FOREIGN KEY ("inductionClassQuarter") REFERENCES "induction_class"("quarter") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
    await queryRunner.query(
      `ALTER TABLE "rsvp" ADD CONSTRAINT "FK_14d4f4054ecf49c45bd4fb49366" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
    await queryRunner.query(
      `ALTER TABLE "rsvp" ADD CONSTRAINT "FK_8c5ffa3406f54eeb64a0768a510" FOREIGN KEY ("appUserId") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_cae89966587ea2fae4ab6334347" FOREIGN KEY ("attendeeId") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_8824ccf7908fd609093f243150b" FOREIGN KEY ("officerId") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_f89c5a18dbf866ba8b1e4a9b8e9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`
    );
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" ADD CONSTRAINT "FK_ae61de7bcb59f2b82c4218c9e71" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" ADD CONSTRAINT "FK_a62ab1e0e22487c58afd071c20c" FOREIGN KEY ("appUserId") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `CREATE VIEW "inductee_stat" AS SELECT "appUser"."id" AS "user", "appUser"."inductionClassQuarter" AS "inductionClass", SUM("attendance"."duration") AS "inductionPoints", COUNT("event"."type" = 'professional') > 0 AS "professional", COUNT("event"."type" = 'mentorship') > 0 AS "mentorship" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" = true GROUP BY "appUser"."id", "appUser"."inductionClassQuarter"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'inductee_stat',
        'SELECT "appUser"."id" AS "user", "appUser"."inductionClassQuarter" AS "inductionClass", SUM("attendance"."duration") AS "inductionPoints", COUNT("event"."type" = \'professional\') > 0 AS "professional", COUNT("event"."type" = \'mentorship\') > 0 AS "mentorship" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" = true GROUP BY "appUser"."id", "appUser"."inductionClassQuarter"',
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`,
      ['public', 'inductee_stat']
    );
    await queryRunner.query(`DROP VIEW "inductee_stat"`);
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" DROP CONSTRAINT "FK_a62ab1e0e22487c58afd071c20c"`
    );
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" DROP CONSTRAINT "FK_ae61de7bcb59f2b82c4218c9e71"`
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_f89c5a18dbf866ba8b1e4a9b8e9"`
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_8824ccf7908fd609093f243150b"`
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_cae89966587ea2fae4ab6334347"`
    );
    await queryRunner.query(`ALTER TABLE "rsvp" DROP CONSTRAINT "FK_8c5ffa3406f54eeb64a0768a510"`);
    await queryRunner.query(`ALTER TABLE "rsvp" DROP CONSTRAINT "FK_14d4f4054ecf49c45bd4fb49366"`);
    await queryRunner.query(
      `ALTER TABLE "app_user" DROP CONSTRAINT "FK_d307df54a9b4539f89d593d5d7d"`
    );
    await queryRunner.query(`DROP INDEX "IDX_a62ab1e0e22487c58afd071c20"`);
    await queryRunner.query(`DROP INDEX "IDX_ae61de7bcb59f2b82c4218c9e7"`);
    await queryRunner.query(`DROP TABLE "event_hosts_app_user"`);
    await queryRunner.query(`DROP TABLE "attendance"`);
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TYPE "event_status_enum"`);
    await queryRunner.query(`DROP TYPE "event_type_enum"`);
    await queryRunner.query(`DROP TABLE "rsvp"`);
    await queryRunner.query(`DROP TABLE "app_user"`);
    await queryRunner.query(`DROP TYPE "app_user_role_enum"`);
    await queryRunner.query(`DROP TABLE "induction_class"`);
  }
}
