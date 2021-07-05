import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateStorage1624496144836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'storage',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'ingredient_id',
                        type: 'uuid',
                    },
                    {
                        name: 'amount',
                        type: 'integer',
                    }
                ]
            }),
        );

        await queryRunner.createForeignKey('storage', new TableForeignKey({
            name: 'user_fk',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('storage', new TableForeignKey({
            name: 'ingredient_fk',
            columnNames: ['ingredient_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ingredient',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('storage', 'ingredient_fk');
        await queryRunner.dropForeignKey('storage', 'user_fk');
        await queryRunner.dropTable('storage')
    }

}
