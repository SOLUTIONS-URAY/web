import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTelegramMatch1732955679755 implements MigrationInterface {
    name = 'AddTelegramMatch1732955679755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "telegram_match" ("id" SERIAL NOT NULL, "telegramId" character varying NOT NULL, "telegramUsername" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_796130deb235f890e871e16da1" UNIQUE ("userId"), CONSTRAINT "PK_871080030fb0020fe7443d922d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "telegramMatchId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_b4144bef8eb06160279bb6c1337" UNIQUE ("telegramMatchId")`);
        await queryRunner.query(`ALTER TABLE "telegram_match" ADD CONSTRAINT "FK_796130deb235f890e871e16da16" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_b4144bef8eb06160279bb6c1337" FOREIGN KEY ("telegramMatchId") REFERENCES "telegram_match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_b4144bef8eb06160279bb6c1337"`);
        await queryRunner.query(`ALTER TABLE "telegram_match" DROP CONSTRAINT "FK_796130deb235f890e871e16da16"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_b4144bef8eb06160279bb6c1337"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "telegramMatchId"`);
        await queryRunner.query(`DROP TABLE "telegram_match"`);
    }

}
