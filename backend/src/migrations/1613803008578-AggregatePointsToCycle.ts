import { MigrationInterface, QueryRunner } from 'typeorm';

export class AggregatePointsToCycle1613803008578 implements MigrationInterface {
  name = 'AggregatePointsToCycle1613803008578';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`,
      ['public', 'inductee_points_view']
    );
    await queryRunner.query(`DROP VIEW "inductee_points_view"`);
    await queryRunner.query(
      `CREATE TABLE "quarter" ("name" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "cycle" text NOT NULL, CONSTRAINT "PK_1e472bc50c1c5fc424327da75fa" PRIMARY KEY ("name"))`
    );
    await queryRunner.query(
      `CREATE VIEW "events_view" AS SELECT "event"."id" AS "eventId", "event"."name" AS "eventName", "event"."type" AS "eventType", "quarter"."name" AS "eventQuarter", "quarter"."cycle" AS "eventCycle" FROM "event" "event" INNER JOIN "quarter" "quarter" ON "event"."startDate" >= "quarter"."startDate" AND "event"."endDate" < "quarter"."endDate"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'events_view',
        'SELECT "event"."id" AS "eventId", "event"."name" AS "eventName", "event"."type" AS "eventType", "quarter"."name" AS "eventQuarter", "quarter"."cycle" AS "eventCycle" FROM "event" "event" INNER JOIN "quarter" "quarter" ON "event"."startDate" >= "quarter"."startDate" AND "event"."endDate" < "quarter"."endDate"',
      ]
    );
    await queryRunner.query(
      `CREATE VIEW "inductee_points_view" AS SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", "event_view"."eventCycle" AS "event_view_eventCycle", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId"  INNER JOIN "events_view" "event_view" ON "event"."id" = "event_view"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id", "event_view"."eventCycle"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'inductee_points_view',
        'SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", "event_view"."eventCycle" AS "event_view_eventCycle", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = \'professional\' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = \'mentorship\' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId"  INNER JOIN "events_view" "event_view" ON "event"."id" = "event_view"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id", "event_view"."eventCycle"',
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`,
      ['public', 'inductee_points_view']
    );
    await queryRunner.query(`DROP VIEW "inductee_points_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`,
      ['public', 'events_view']
    );
    await queryRunner.query(`DROP VIEW "events_view"`);
    await queryRunner.query(`DROP TABLE "quarter"`);
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
}
