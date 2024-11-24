import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOrganization1732476052030 implements MigrationInterface {
    name = 'AddOrganization1732476052030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization" ("uuid" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_59f940b5775a9ccf5c2f094c8af" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "organizationUuid" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5b5efa9dd58f4ee52046f34cda7" FOREIGN KEY ("organizationUuid") REFERENCES "organization"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5b5efa9dd58f4ee52046f34cda7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organizationUuid"`);
        await queryRunner.query(`DROP TABLE "organization"`);
    }

}
