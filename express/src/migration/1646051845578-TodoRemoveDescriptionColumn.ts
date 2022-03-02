import {MigrationInterface, QueryRunner} from "typeorm";

export class TodoRemoveDescriptionColumn1646051845578 implements MigrationInterface {
    name = 'TodoRemoveDescriptionColumn1646051845578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`description\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
