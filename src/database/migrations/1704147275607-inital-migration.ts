import { MigrationInterface, QueryRunner } from "typeorm";

export class InitalMigration1704147275607 implements MigrationInterface {
    name = 'InitalMigration1704147275607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."event_currency_enum" AS ENUM('ngn', 'ghs')`);
        await queryRunner.query(`ALTER TABLE "event" ADD "currency" "public"."event_currency_enum" NOT NULL DEFAULT 'ngn'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "currency"`);
        await queryRunner.query(`DROP TYPE "public"."event_currency_enum"`);
    }

}
