import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1732450281312 implements MigrationInterface {
    name = 'Init1732450281312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ticket_event_type_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "ticket_event" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."ticket_event_type_enum" NOT NULL, "message" character varying(1024) NOT NULL, "authorId" integer, "ticketId" integer, CONSTRAINT "PK_c2e8cce25f467bdc9c311a777ab" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_userrole_enum" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "userRole" "public"."user_userrole_enum" NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_priority_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_type_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "priority" "public"."ticket_priority_enum" NOT NULL, "title" character varying NOT NULL, "type" "public"."ticket_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "status" "public"."ticket_status_enum" NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket_event" ADD CONSTRAINT "FK_7e2f7c3fe3c828579787a017d02" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_event" ADD CONSTRAINT "FK_52ad15979fca7c3e0e008a51ba2" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_event" DROP CONSTRAINT "FK_52ad15979fca7c3e0e008a51ba2"`);
        await queryRunner.query(`ALTER TABLE "ticket_event" DROP CONSTRAINT "FK_7e2f7c3fe3c828579787a017d02"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_priority_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_userrole_enum"`);
        await queryRunner.query(`DROP TABLE "ticket_event"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_event_type_enum"`);
    }

}
