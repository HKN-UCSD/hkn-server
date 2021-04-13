import {MigrationInterface, QueryRunner} from "typeorm";

export class AggregatePointCycle1618297874071 implements MigrationInterface {
    name = 'AggregatePointCycle1618297874071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","inductee_points_view"]);
        await queryRunner.query(`DROP VIEW "inductee_points_view"`);
        await queryRunner.query(`ALTER TABLE "induction_class" ADD "year" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_864f2562002a27e069358103ac" ON "induction_class" ("year") `);
        await queryRunner.query(`CREATE VIEW "events_view" AS SELECT "event"."id" AS "eventId", "event"."name" AS "eventName", "event"."type" AS "eventType", "induction_class"."name" AS "eventCycle", "induction_class"."year" AS "eventYear" FROM "event" "event" INNER JOIN "induction_class" "induction_class" ON "event"."startDate" >= "induction_class"."startDate" AND "event"."endDate" < "induction_class"."endDate"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","events_view","SELECT \"event\".\"id\" AS \"eventId\", \"event\".\"name\" AS \"eventName\", \"event\".\"type\" AS \"eventType\", \"induction_class\".\"name\" AS \"eventCycle\", \"induction_class\".\"year\" AS \"eventYear\" FROM \"event\" \"event\" INNER JOIN \"induction_class\" \"induction_class\" ON \"event\".\"startDate\" >= \"induction_class\".\"startDate\" AND \"event\".\"endDate\" < \"induction_class\".\"endDate\""]);
        await queryRunner.query(`CREATE VIEW "inductee_points_view" AS SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", "event_view"."eventYear" AS "eventYear", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId"  INNER JOIN "events_view" "event_view" ON "event"."id" = "event_view"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id", "event_view"."eventYear"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","inductee_points_view","SELECT \"appUser\".\"id\" AS \"user\", \"appUser\".\"email\" AS \"email\", \"event_view\".\"eventYear\" AS \"eventYear\", SUM(\"attendance\".\"points\") AS \"points\", SUM(CASE WHEN \"event\".\"type\" = 'professional' THEN 1 ELSE 0 END)::int::bool AS \"hasProfessionalRequirement\", SUM(CASE WHEN \"event\".\"type\" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS \"hasMentorshipRequirement\" FROM \"app_user\" \"appUser\" INNER JOIN \"attendance\" \"attendance\" ON \"appUser\".\"id\" = \"attendance\".\"attendeeId\"  INNER JOIN \"event\" \"event\" ON \"event\".\"id\" = \"attendance\".\"eventId\"  INNER JOIN \"events_view\" \"event_view\" ON \"event\".\"id\" = \"event_view\".\"eventId\" WHERE \"attendance\".\"isInductee\" GROUP BY \"appUser\".\"id\", \"event_view\".\"eventYear\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","inductee_points_view"]);
        await queryRunner.query(`DROP VIEW "inductee_points_view"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","events_view"]);
        await queryRunner.query(`DROP VIEW "events_view"`);
        await queryRunner.query(`DROP INDEX "IDX_864f2562002a27e069358103ac"`);
        await queryRunner.query(`ALTER TABLE "induction_class" DROP COLUMN "year"`);
        await queryRunner.query(`CREATE VIEW "inductee_points_view" AS SELECT "appUser"."id" AS "user", "appUser"."email" AS "email", SUM("attendance"."points") AS "points", SUM(CASE WHEN "event"."type" = 'professional' THEN 1 ELSE 0 END)::int::bool AS "hasProfessionalRequirement", SUM(CASE WHEN "event"."type" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS "hasMentorshipRequirement" FROM "app_user" "appUser" INNER JOIN "attendance" "attendance" ON "appUser"."id" = "attendance"."attendeeId"  INNER JOIN "event" "event" ON "event"."id" = "attendance"."eventId" WHERE "attendance"."isInductee" GROUP BY "appUser"."id"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","inductee_points_view","SELECT \"appUser\".\"id\" AS \"user\", \"appUser\".\"email\" AS \"email\", SUM(\"attendance\".\"points\") AS \"points\", SUM(CASE WHEN \"event\".\"type\" = 'professional' THEN 1 ELSE 0 END)::int::bool AS \"hasProfessionalRequirement\", SUM(CASE WHEN \"event\".\"type\" = 'mentorship' THEN 1 ELSE 0 END)::int::bool AS \"hasMentorshipRequirement\" FROM \"app_user\" \"appUser\" INNER JOIN \"attendance\" \"attendance\" ON \"appUser\".\"id\" = \"attendance\".\"attendeeId\"  INNER JOIN \"event\" \"event\" ON \"event\".\"id\" = \"attendance\".\"eventId\" WHERE \"attendance\".\"isInductee\" GROUP BY \"appUser\".\"id\""]);
    }

}
