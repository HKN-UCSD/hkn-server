import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixPointsViews1600027801558 implements MigrationInterface {
  name = 'FixPointsViews1600027801558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`,
      ['public', 'inductee_stat']
    );
    await queryRunner.query(`DROP VIEW "inductee_stat"`);
    await queryRunner.query(
      `CREATE VIEW "member_points_view" AS SELECT "appUser"."id" AS "user", SUM("attendance"."duration") AS "points" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId" WHERE NOT "attendance"."isInductee" GROUP BY "appUser"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'member_points_view',
        'SELECT "appUser"."id" AS "user", SUM("attendance"."duration") AS "points" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId" WHERE NOT "attendance"."isInductee" GROUP BY "appUser"."id"',
      ]
    );
    await queryRunner.query(
      `CREATE VIEW "inductee_points_view" AS SELECT "appUser"."id" AS "user", SUM("attendance"."duration") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'inductee_points_view',
        'SELECT "appUser"."id" AS "user", SUM("attendance"."duration") AS "points", SUM(CASE WHEN "event"."type" = \'professional\' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = \'mentorship\' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"',
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
      ['public', 'member_points_view']
    );
    await queryRunner.query(`DROP VIEW "member_points_view"`);
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
}
