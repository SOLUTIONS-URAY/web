import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddTypeForTicketEvent1732746313642 implements MigrationInterface {
    name = 'AddTypeForTicketEvent1732746313642';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TYPE "public"."ticket_event_type_enum" RENAME TO "ticket_event_type_enum_old"`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ticket_event_type_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6')`,
        );
        await queryRunner.query(
            `ALTER TABLE "ticket_event" ALTER COLUMN "type" TYPE "public"."ticket_event_type_enum" USING "type"::"text"::"public"."ticket_event_type_enum"`,
        );
        await queryRunner.query(`DROP TYPE "public"."ticket_event_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."ticket_event_type_enum_old" AS ENUM('0', '1', '2', '3', '4', '5')`,
        );
        await queryRunner.query(
            `ALTER TABLE "ticket_event" ALTER COLUMN "type" TYPE "public"."ticket_event_type_enum_old" USING "type"::"text"::"public"."ticket_event_type_enum_old"`,
        );
        await queryRunner.query(`DROP TYPE "public"."ticket_event_type_enum"`);
        await queryRunner.query(
            `ALTER TYPE "public"."ticket_event_type_enum_old" RENAME TO "ticket_event_type_enum"`,
        );
    }
}
