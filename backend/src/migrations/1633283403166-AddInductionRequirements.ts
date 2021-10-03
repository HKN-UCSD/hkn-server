import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInductionRequirements1633283403166 implements MigrationInterface {
  name = 'AddInductionRequirements1633283403166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3`,
      ['VIEW', 'public', 'inductee_points_view']
    );
    await queryRunner.query(`DROP VIEW "public"."inductee_points_view"`);
    await queryRunner.query(
      `CREATE VIEW "inductee_points_view" AS SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement", SUM(CASE WHEN "event"."type" = 'technical' THEN 1 ELSE 0 END)::int::bool AS "hasTechnicalRequirement", CASE WHEN( SUM(CASE WHEN "event"."type" = 'social' THEN 1 ELSE 0 END)::int ) = 2 THEN TRUE ELSE FALSE END AS "hasSocialRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'inductee_points_view',
        'SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = \'professional\' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = \'mentorship\' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement", SUM(CASE WHEN "event"."type" = \'technical\' THEN 1 ELSE 0 END)::int::bool AS "hasTechnicalRequirement", CASE WHEN( SUM(CASE WHEN "event"."type" = \'social\' THEN 1 ELSE 0 END)::int ) = 2 THEN TRUE ELSE FALSE END AS "hasSocialRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"',
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
      `CREATE VIEW "public"."inductee_points_view" AS SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"`
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
