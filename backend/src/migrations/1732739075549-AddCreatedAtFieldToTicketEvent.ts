import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedAtFieldToTicketEvent1732739075549 implements MigrationInterface {
    name = 'AddCreatedAtFieldToTicketEvent1732739075549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_event" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_event" DROP COLUMN "created_at"`);
    }

}
