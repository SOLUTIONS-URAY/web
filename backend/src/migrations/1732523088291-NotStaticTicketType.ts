import {MigrationInterface, QueryRunner} from 'typeorm';

export class NotStaticTicketType1732523088291 implements MigrationInterface {
    name = 'NotStaticTicketType1732523088291';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "ticket" RENAME COLUMN "type" TO "typeId"`,
        );
        await queryRunner.query(
            `ALTER TYPE "public"."ticket_type_enum" RENAME TO "ticket_typeid_enum"`,
        );
        await queryRunner.query(
            `CREATE TABLE "ticket_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_757d4830df239a662399edf9f24" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TYPE "public"."ticket_priority_enum" RENAME TO "ticket_priority_enum_old"`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ticket_priority_enum" AS ENUM('0', '1', '2', '3')`,
        );
        await queryRunner.query(
            `ALTER TABLE "ticket" ALTER COLUMN "priority" TYPE "public"."ticket_priority_enum" USING "priority"::"text"::"public"."ticket_priority_enum"`,
        );
        await queryRunner.query(
            `ALTER TABLE "ticket" ALTER COLUMN "priority" SET DEFAULT '0'`,
        );
        await queryRunner.query(`DROP TYPE "public"."ticket_priority_enum_old"`);
        await queryRunner.query(
            `ALTER TABLE "ticket" ALTER COLUMN "priority" SET DEFAULT '0'`,
        );
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "typeId"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "typeId" integer`);
        await queryRunner.query(
            `ALTER TABLE "ticket" ADD CONSTRAINT "FK_c9890054657167fae5322b9aa2e" FOREIGN KEY ("typeId") REFERENCES "ticket_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "ticket" DROP CONSTRAINT "FK_c9890054657167fae5322b9aa2e"`,
        );
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "typeId"`);
        await queryRunner.query(
            `ALTER TABLE "ticket" ADD "typeId" "public"."ticket_typeid_enum" NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "ticket" ALTER COLUMN "priority" DROP DEFAULT`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ticket_priority_enum_old" AS ENUM('0', '1', '2')`,
        );
        await queryRunner.query(
            `ALTER TABLE "ticket" ALTER COLUMN "priority" DROP DEFAULT`,
        );
        await queryRunner.query(
            `ALTER TABLE "ticket" ALTER COLUMN "priority" TYPE "public"."ticket_priority_enum_old" USING "priority"::"text"::"public"."ticket_priority_enum_old"`,
        );
        await queryRunner.query(`DROP TYPE "public"."ticket_priority_enum"`);
        await queryRunner.query(
            `ALTER TYPE "public"."ticket_priority_enum_old" RENAME TO "ticket_priority_enum"`,
        );
        await queryRunner.query(`DROP TABLE "ticket_type"`);
        await queryRunner.query(
            `ALTER TYPE "public"."ticket_typeid_enum" RENAME TO "ticket_type_enum"`,
        );
        await queryRunner.query(
            `ALTER TABLE "ticket" RENAME COLUMN "typeId" TO "type"`,
        );
    }
}
