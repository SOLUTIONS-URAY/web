import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSyntData1732729193083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "organization" WHERE "uuid" = 1;`);
        await queryRunner.query(`INSERT INTO "organization" ("uuid", "name") VALUES (1, 'МБУ ДО ЦДО')`);
        await queryRunner.query(`INSERT INTO "user" ("fullName", "email", "password", "userRole", "isActive", "organizationUuid") VALUES ('Малыгин А.Е.','test@yandex.ru','$2y$10$nzns5cN1es2F/zrZAJPS2u8A1gcD7HqbjTwwcIUi81Imu48f19nh6', '0', true, 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
