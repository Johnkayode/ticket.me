import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitalMigration1704469736271 implements MigrationInterface {
  name = 'InitalMigration1704469736271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "userId"`);
  }
}
