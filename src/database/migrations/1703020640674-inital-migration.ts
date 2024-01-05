import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitalMigration1703020640674 implements MigrationInterface {
  name = 'InitalMigration1703020640674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, "fromDate" TIMESTAMP WITH TIME ZONE NOT NULL, "toDate" TIMESTAMP WITH TIME ZONE NOT NULL, "venue" text NOT NULL, "max_participants" integer, "is_closed" boolean NOT NULL DEFAULT false, "is_cancelled" boolean NOT NULL DEFAULT false, "is_free" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reference" character varying(255) NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255), "email" character varying(255) NOT NULL, "qrcode" character varying, "pdf" character varying, "is_expired" boolean NOT NULL DEFAULT false, "eventId" uuid, CONSTRAINT "UQ_99998d8d0b7bb1046051f15d5c1" UNIQUE ("reference"), CONSTRAINT "UQ_bd230e0abb45bc567a03659cc23" UNIQUE ("email"), CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_cb22a51617991265571be41b74f" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_cb22a51617991265571be41b74f"`);
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
