import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInductionClass1629689989567 implements MigrationInterface {
  name = 'UpdateInductionClass1629689989567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3`,
      ['VIEW', 'public', 'events_view']
    );
    await queryRunner.query(`DROP VIEW "events_view" CASCADE`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3`,
      ['VIEW', 'public', 'inductee_points_view']
    );
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" DROP CONSTRAINT "FK_a62ab1e0e22487c58afd071c20c"`
    );
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" DROP CONSTRAINT "FK_ae61de7bcb59f2b82c4218c9e71"`
    );
    await queryRunner.query(`DROP INDEX "IDX_864f2562002a27e069358103ac"`);
    await queryRunner.query(`ALTER TABLE "induction_class" DROP COLUMN "year"`);
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" ADD CONSTRAINT "FK_ae61de7bcb59f2b82c4218c9e71" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" ADD CONSTRAINT "FK_a62ab1e0e22487c58afd071c20c" FOREIGN KEY ("appUserId") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `CREATE VIEW "inductee_points_view" AS SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'inductee_points_view',
        'SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = \'professional\' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = \'mentorship\' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"',
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3`,
      ['VIEW', 'public', 'inductee_points_view']
    );
    await queryRunner.query(`DROP VIEW "inductee_points_view"`);
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" DROP CONSTRAINT "FK_a62ab1e0e22487c58afd071c20c"`
    );
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" DROP CONSTRAINT "FK_ae61de7bcb59f2b82c4218c9e71"`
    );
    await queryRunner.query(`ALTER TABLE "induction_class" ADD "year" character varying NOT NULL`);
    await queryRunner.query(
      `CREATE INDEX "IDX_864f2562002a27e069358103ac" ON "induction_class" ("year") `
    );
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" ADD CONSTRAINT "FK_ae61de7bcb59f2b82c4218c9e71" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "event_hosts_app_user" ADD CONSTRAINT "FK_a62ab1e0e22487c58afd071c20c" FOREIGN KEY ("appUserId") REFERENCES "app_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `CREATE VIEW "inductee_points_view" AS SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", "event_view"."eventYear" AS "eventYear", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId"  INNER JOIN "events_view" "event_view" ON "event"."id" = "event_view"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id", "event_view"."eventYear"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'inductee_points_view',
        'SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", "event_view"."eventYear" AS "eventYear", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = \'professional\' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = \'mentorship\' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId"  INNER JOIN "events_view" "event_view" ON "event"."id" = "event_view"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id", "event_view"."eventYear"',
      ]
    );
    await queryRunner.query(
      `CREATE VIEW "events_view" AS SELECT "event"."id" AS "eventId", "event"."name" AS "eventName", "event"."type" AS "eventType", "induction_class"."name" AS "eventCycle", "induction_class"."year" AS "eventYear" FROM "event" "event" INNER JOIN "induction_class" "induction_class" ON "event"."startDate" >= "induction_class"."startDate" AND "event"."endDate" < "induction_class"."endDate"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'events_view',
        'SELECT "event"."id" AS "eventId", "event"."name" AS "eventName", "event"."type" AS "eventType", "induction_class"."name" AS "eventCycle", "induction_class"."year" AS "eventYear" FROM "event" "event" INNER JOIN "induction_class" "induction_class" ON "event"."startDate" >= "induction_class"."startDate" AND "event"."endDate" < "induction_class"."endDate"',
      ]
    );
  }
}
