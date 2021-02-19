import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFloatToAttendancePoints1603572219439 implements MigrationInterface {
  name = 'AddFloatToAttendancePoints1603572219439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "points" CASCADE`);
    await queryRunner.query(`ALTER TABLE "attendance" ADD "points" real`);
    await queryRunner.query(
      `CREATE VIEW "member_points_view" AS SELECT "appUser"."id" AS "user", SUM("attendance"."points") AS "points" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId" WHERE NOT "attendance"."isInductee" GROUP BY "appUser"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'member_points_view',
        'SELECT "appUser"."id" AS "user", SUM("attendance"."points") AS "points" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId" WHERE NOT "attendance"."isInductee" GROUP BY "appUser"."id"',
      ]
    );
    await queryRunner.query(
      `CREATE VIEW "inductee_points_view" AS SELECT "appUser"."id" AS "user", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'inductee_points_view',
        'SELECT "appUser"."id" AS "user", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = \'professional\' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = \'mentorship\' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"',
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "points" CASCADE`);
    await queryRunner.query(`ALTER TABLE "attendance" ADD "points" integer`);
    await queryRunner.query(
      `CREATE VIEW "member_points_view" AS SELECT "appUser"."id" AS "user", SUM("attendance"."points") AS "points" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId" WHERE NOT "attendance"."isInductee" GROUP BY "appUser"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'member_points_view',
        'SELECT "appUser"."id" AS "user", SUM("attendance"."points") AS "points" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId" WHERE NOT "attendance"."isInductee" GROUP BY "appUser"."id"',
      ]
    );
    await queryRunner.query(
      `CREATE VIEW "inductee_points_view" AS SELECT "appUser"."id" AS "user", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"`
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'inductee_points_view',
        'SELECT "appUser"."id" AS "user", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = \'professional\' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = \'mentorship\' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"',
      ]
    );
  }
}
