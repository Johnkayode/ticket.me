import { MigrationInterface, QueryRunner } from "typeorm";

export class InitalMigration1703872957022 implements MigrationInterface {
    name = 'InitalMigration1703872957022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_697909a55bde1b28a90560f3ae2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_type" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "amount" double precision NOT NULL, "eventId" uuid, CONSTRAINT "PK_757d4830df239a662399edf9f24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_categories_event_category" ("eventId" uuid NOT NULL, "eventCategoryId" uuid NOT NULL, CONSTRAINT "PK_c535c876ebf7b6192f02f746cc9" PRIMARY KEY ("eventId", "eventCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_177565f9389cf31d3bef16492f" ON "event_categories_event_category" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d468965c200f1e51c135750c2" ON "event_categories_event_category" ("eventCategoryId") `);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "ticketTypeId" uuid`);
        await queryRunner.query(`ALTER TABLE "ticket_type" ADD CONSTRAINT "FK_f9565dc40fcd98961539814b50b" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_7061359da242fbf565771953137" FOREIGN KEY ("ticketTypeId") REFERENCES "ticket_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_categories_event_category" ADD CONSTRAINT "FK_177565f9389cf31d3bef16492f4" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_categories_event_category" ADD CONSTRAINT "FK_7d468965c200f1e51c135750c28" FOREIGN KEY ("eventCategoryId") REFERENCES "event_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_categories_event_category" DROP CONSTRAINT "FK_7d468965c200f1e51c135750c28"`);
        await queryRunner.query(`ALTER TABLE "event_categories_event_category" DROP CONSTRAINT "FK_177565f9389cf31d3bef16492f4"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_7061359da242fbf565771953137"`);
        await queryRunner.query(`ALTER TABLE "ticket_type" DROP CONSTRAINT "FK_f9565dc40fcd98961539814b50b"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "ticketTypeId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d468965c200f1e51c135750c2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_177565f9389cf31d3bef16492f"`);
        await queryRunner.query(`DROP TABLE "event_categories_event_category"`);
        await queryRunner.query(`DROP TABLE "ticket_type"`);
        await queryRunner.query(`DROP TABLE "event_category"`);
    }

}
