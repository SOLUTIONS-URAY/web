import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1732704373197 implements MigrationInterface {
    name = 'FixRelations1732704373197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "issuedUserId" integer`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "assignedUserId" integer`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_7ac449292077c3df4fe69f77044" FOREIGN KEY ("issuedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_f8685099711b1d9d24ebad47ac9" FOREIGN KEY ("assignedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_f8685099711b1d9d24ebad47ac9"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_7ac449292077c3df4fe69f77044"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "assignedUserId"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "issuedUserId"`);
    }

}
